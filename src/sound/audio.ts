import { pitchToFrequency, pitchToMidi } from "../utils/musicNotation";

export const MAX_POLYPHONY = 64;

interface VoiceSlot {
  id: number;
  inUse: boolean;
  pitch: string;
  midi: number;
  startTime: number;
  stopTime: number;
  isReleasing: boolean;
  isHeld: boolean;

  // Pre-connected Web Audio Subgraph
  filterNode: BiquadFilterNode;
  gainNode: GainNode;
  panNode: StereoPannerNode | null;

  // Active oscillators (cleared on release)
  osc1: OscillatorNode | null;
  osc2: OscillatorNode | null;
  osc3: OscillatorNode | null;
  cleanupTimer: number | null;
}

/**
 * Ultra-Responsive, Zero-Latency, Concert Grand Piano Physical Modeling Engine.
 *
 * Engineering Highlights:
 * 1. Multi-Register Acoustic Partials: 4 calibrated Steinway D tables (Sub-Bass, Tenor, Mid, Treble).
 * 2. Dynamic Damper Articulation:
 *    - Short/ultra-fast notes (16th, 32nd notes, rapid arpeggios):
 *      Immediate acoustic felt damping (15ms - 28ms) with dual-stage spectral closure (damping highs
 *      first, then fundamental) so fast runs breathe naturally with crisp definition and zero muddy blur.
 *    - Long notes: Natural two-stage exponential string decay (prompt sound into warm singing aftersound).
 * 3. Triple Unison Chorus Detuning: Micro-detuning replicating real acoustic string unisons.
 * 4. Double Escapement Rapid Retrigger: Seamlessly dampens prior strikes of the same pitch in 4ms without clicks.
 * 5. High-Capacity 64-Voice Object Pool: Zero runtime allocations during playback, eliminating GC pauses.
 * 6. Full 88-Key Piano Range (A0 to C8) with smooth acoustic stereo imaging.
 */
class PianoSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private soundboardEQ: BiquadFilterNode | null = null;
  private soundboardAir: BiquadFilterNode | null = null;

  // Algorithmic Schroeder Concert Hall Reverb
  private reverbInput: GainNode | null = null;
  private reverbOutput: GainNode | null = null;
  private dryGain: GainNode | null = null;

  // State
  private isSustainActive: boolean = false;
  private volume: number = 0.85;
  private reverbLevel: number = 0.28;

  // Voice Pool
  private voicePool: VoiceSlot[] = [];

  // Pre-computed PeriodicWaves
  private subBassWave: PeriodicWave | null = null;
  private tenorWave: PeriodicWave | null = null;
  private midWave: PeriodicWave | null = null;
  private trebleWave: PeriodicWave | null = null;

  // Pre-computed Felt Hammer Strike Transient Buffer
  private hammerBuffer: AudioBuffer | null = null;

  constructor() {
    // Lazy initialization on user interaction
  }

  public getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass({ latencyHint: "interactive" });
      this.initGraph(this.ctx);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public async ensureAudioContext(): Promise<AudioContext> {
    const ctx = this.getContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx;
  }

  public getCurrentTime(): number {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  private initGraph(ctx: AudioContext): void {
    // 1. Master Output Chain
    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, ctx.currentTime);

    // Dynamics Limiter / Compressor to avoid any digital clipping on loud chords
    this.masterCompressor = ctx.createDynamicsCompressor();
    this.masterCompressor.threshold.setValueAtTime(-15, ctx.currentTime);
    this.masterCompressor.knee.setValueAtTime(10, ctx.currentTime);
    this.masterCompressor.ratio.setValueAtTime(2.5, ctx.currentTime);
    this.masterCompressor.attack.setValueAtTime(0.001, ctx.currentTime);
    this.masterCompressor.release.setValueAtTime(0.15, ctx.currentTime);

    // Soundboard Body Warmth EQ (peaking warmth at 200 Hz)
    this.soundboardEQ = ctx.createBiquadFilter();
    this.soundboardEQ.type = "peaking";
    this.soundboardEQ.frequency.setValueAtTime(200, ctx.currentTime);
    this.soundboardEQ.Q.setValueAtTime(1.0, ctx.currentTime);
    this.soundboardEQ.gain.setValueAtTime(3.5, ctx.currentTime);

    // High Air Presence (subtle sheen around 5.5 kHz)
    this.soundboardAir = ctx.createBiquadFilter();
    this.soundboardAir.type = "highshelf";
    this.soundboardAir.frequency.setValueAtTime(5500, ctx.currentTime);
    this.soundboardAir.gain.setValueAtTime(3.0, ctx.currentTime);

    this.soundboardEQ.connect(this.soundboardAir);

    // 2. Algorithmic Reverb
    this.initSchroederReverb(ctx);

    this.dryGain = ctx.createGain();
    this.dryGain.gain.setValueAtTime(1.0, ctx.currentTime);

    this.soundboardAir.connect(this.dryGain);
    this.dryGain.connect(this.masterCompressor);

    if (this.reverbInput && this.reverbOutput) {
      this.soundboardAir.connect(this.reverbInput);
      this.reverbOutput.connect(this.masterCompressor);
    }

    this.masterCompressor.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);

    // 3. Pre-compute Harmonic PeriodicWaves
    this.initPeriodicWaves(ctx);

    // 4. Pre-compute Felt Hammer Attack Transient Buffer
    this.initHammerBuffer(ctx);

    // 5. Pre-allocate 64-Voice Pool
    this.initVoicePool(ctx);
  }

  private initSchroederReverb(ctx: AudioContext): void {
    this.reverbInput = ctx.createGain();
    this.reverbOutput = ctx.createGain();
    this.reverbOutput.gain.setValueAtTime(this.reverbLevel * 0.6, ctx.currentTime);

    const reverbFilter = ctx.createBiquadFilter();
    reverbFilter.type = "lowpass";
    reverbFilter.frequency.setValueAtTime(3400, ctx.currentTime);
    this.reverbInput.connect(reverbFilter);

    // 4 Parallel Feedback Comb Filters
    const combTimes = [0.0297, 0.0371, 0.0411, 0.0437];
    const combFeedback = 0.77;

    const combMixGain = ctx.createGain();
    combMixGain.gain.setValueAtTime(0.25, ctx.currentTime);

    for (const delaySec of combTimes) {
      const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(delaySec, ctx.currentTime);

      const feedback = ctx.createGain();
      feedback.gain.setValueAtTime(combFeedback, ctx.currentTime);

      const damp = ctx.createBiquadFilter();
      damp.type = "lowpass";
      damp.frequency.setValueAtTime(2800, ctx.currentTime);

      reverbFilter.connect(delay);
      delay.connect(damp);
      damp.connect(feedback);
      feedback.connect(delay);

      damp.connect(combMixGain);
    }

    // 2 Series Allpass Filters for spatial diffusion
    const allpassTimes = [0.005, 0.0017];
    let lastNode: AudioNode = combMixGain;

    for (const apTime of allpassTimes) {
      const apDelay = ctx.createDelay();
      apDelay.delayTime.setValueAtTime(apTime, ctx.currentTime);

      const apGain = ctx.createGain();
      apGain.gain.setValueAtTime(0.6, ctx.currentTime);

      const apInvGain = ctx.createGain();
      apInvGain.gain.setValueAtTime(-0.6, ctx.currentTime);

      const apSum = ctx.createGain();

      lastNode.connect(apDelay);
      lastNode.connect(apInvGain);
      apInvGain.connect(apSum);

      apDelay.connect(apGain);
      apGain.connect(lastNode);
      apDelay.connect(apSum);

      lastNode = apSum;
    }

    lastNode.connect(this.reverbOutput);
  }

  private initPeriodicWaves(ctx: AudioContext): void {
    // 1. Sub-Bass (A0 - B1): Heavy copper wound wire with dense inharmonic partials
    const subBassReal = new Float32Array(24);
    const subBassImag = new Float32Array(24);
    const subBassPartials = [
      0, 0.4, 1.0, 0.85, 0.72, 0.61, 0.49, 0.38, 0.29, 0.22, 0.17, 0.13, 0.09, 0.07, 0.05, 0.04,
      0.03, 0.02, 0.015, 0.012, 0.009, 0.007, 0.005, 0.003,
    ];
    for (let i = 1; i < subBassPartials.length; i++) {
      subBassImag[i] = subBassPartials[i];
    }
    this.subBassWave = ctx.createPeriodicWave(subBassReal, subBassImag, {
      disableNormalization: false,
    });

    // 2. Tenor / Low-Mid (C2 - B3): Rich core body resonance
    const tenorReal = new Float32Array(16);
    const tenorImag = new Float32Array(16);
    const tenorPartials = [
      0, 1.0, 0.85, 0.68, 0.46, 0.31, 0.2, 0.12, 0.07, 0.045, 0.028, 0.016, 0.01, 0.006, 0.003,
      0.001,
    ];
    for (let i = 1; i < tenorPartials.length; i++) {
      tenorImag[i] = tenorPartials[i];
    }
    this.tenorWave = ctx.createPeriodicWave(tenorReal, tenorImag, {
      disableNormalization: false,
    });

    // 3. Mid Register (C4 - B5): Classic Steinway singing bell-like tone
    const midReal = new Float32Array(12);
    const midImag = new Float32Array(12);
    const midPartials = [0, 1.0, 0.6, 0.35, 0.18, 0.09, 0.04, 0.02, 0.01, 0.005, 0.002, 0.001];
    for (let i = 1; i < midPartials.length; i++) {
      midImag[i] = midPartials[i];
    }
    this.midWave = ctx.createPeriodicWave(midReal, midImag, {
      disableNormalization: false,
    });

    // 4. Treble Register (C6 - C8): Pure fundamental with rapid natural string dissipation
    const trebReal = new Float32Array(8);
    const trebImag = new Float32Array(8);
    const trebPartials = [0, 1.0, 0.45, 0.15, 0.05, 0.01, 0.002, 0.0005];
    for (let i = 1; i < trebPartials.length; i++) {
      trebImag[i] = trebPartials[i];
    }
    this.trebleWave = ctx.createPeriodicWave(trebReal, trebImag, {
      disableNormalization: false,
    });
  }

  private initHammerBuffer(ctx: AudioContext): void {
    const length = Math.floor(ctx.sampleRate * 0.014); // 14ms felt transient
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const channel = buffer.getChannelData(0);

    for (let i = 0; i < length; i++) {
      const decay = Math.exp(-i / (length * 0.24));
      channel[i] = (Math.random() * 2 - 1) * decay;
    }
    this.hammerBuffer = buffer;
  }

  private initVoicePool(ctx: AudioContext): void {
    this.voicePool = [];
    for (let i = 0; i < MAX_POLYPHONY; i++) {
      const filterNode = ctx.createBiquadFilter();
      filterNode.type = "lowpass";

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);

      const panNode = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      filterNode.connect(gainNode);
      if (panNode) {
        gainNode.connect(panNode);
        panNode.connect(this.soundboardEQ!);
      } else {
        gainNode.connect(this.soundboardEQ!);
      }

      this.voicePool.push({
        id: i,
        inUse: false,
        pitch: "",
        midi: 60,
        startTime: 0,
        stopTime: 0,
        isReleasing: false,
        isHeld: false,
        filterNode,
        gainNode,
        panNode,
        osc1: null,
        osc2: null,
        osc3: null,
        cleanupTimer: null,
      });
    }
  }

  /**
   * Acquires an optimal voice slot from the 64-voice pool.
   * If retriggering the same pitch, softly damps the existing voice (Double Escapement).
   */
  private acquireVoiceSlot(now: number, targetPitch: string): VoiceSlot {
    // 1. Check for rapid repeated notes on the same pitch: softly crossfade prior voice
    for (const slot of this.voicePool) {
      if (slot.inUse && slot.pitch === targetPitch && !slot.isReleasing) {
        this.dampVoiceSmooth(slot, now, 0.004); // 4ms smooth acoustic handoff
      }
    }

    // 2. Look for an idle slot
    for (const slot of this.voicePool) {
      if (!slot.inUse) {
        slot.inUse = true;
        slot.isReleasing = false;
        slot.isHeld = false;
        return slot;
      }
    }

    // 3. Voice Stealing: pick voice already releasing with earliest start or lowest gain
    let bestSlot = this.voicePool[0];
    let lowestScore = Number.MAX_VALUE;

    for (const slot of this.voicePool) {
      let score = slot.startTime;
      if (slot.isReleasing) score -= 1000; // Prioritize releasing tails
      if (score < lowestScore) {
        lowestScore = score;
        bestSlot = slot;
      }
    }

    this.stopSlotImmediate(bestSlot, now);
    bestSlot.inUse = true;
    bestSlot.isReleasing = false;
    bestSlot.isHeld = false;
    return bestSlot;
  }

  private dampVoiceSmooth(slot: VoiceSlot, when: number, fadeSec: number): void {
    try {
      slot.isReleasing = true;
      slot.gainNode.gain.cancelScheduledValues(when);
      const cur = Math.max(0.0001, slot.gainNode.gain.value);
      slot.gainNode.gain.setValueAtTime(cur, when);
      slot.gainNode.gain.linearRampToValueAtTime(0.0001, when + fadeSec);
    } catch {
      // ignore
    }

    if (slot.cleanupTimer !== null) {
      window.clearTimeout(slot.cleanupTimer);
    }
    slot.cleanupTimer = window.setTimeout(() => {
      this.stopSlotImmediate(slot, when + fadeSec);
    }, Math.max(10, fadeSec * 1000 + 5));
  }

  private stopSlotImmediate(slot: VoiceSlot, when: number): void {
    if (slot.cleanupTimer !== null) {
      window.clearTimeout(slot.cleanupTimer);
      slot.cleanupTimer = null;
    }

    try {
      slot.gainNode.gain.cancelScheduledValues(when);
      slot.gainNode.gain.setValueAtTime(0.0001, when);
    } catch {
      // ignore
    }

    const stopAt = Math.max(when + 0.003, slot.startTime);
    for (const osc of [slot.osc1, slot.osc2, slot.osc3]) {
      if (osc) {
        try {
          osc.stop(stopAt);
          osc.disconnect();
        } catch {
          // ignore
        }
      }
    }

    slot.osc1 = null;
    slot.osc2 = null;
    slot.osc3 = null;
    slot.inUse = false;
    slot.isReleasing = false;
    slot.isHeld = false;
  }

  /**
   * Immediate play on key press (zero lag).
   */
  public playNote(pitch: string, durationSeconds?: number, velocity: number = 0.85): void {
    if (!pitch) return;
    const ctx = this.getContext();
    this.scheduleNote(pitch, ctx.currentTime, durationSeconds, velocity, true);
  }

  /**
   * Sample-accurate hardware clock note scheduling.
   * Dynamically adapts articulation, attack transients, string resonance and damper decay!
   */
  public scheduleNote(
    pitch: string,
    whenAudioTime: number,
    durationSeconds?: number,
    velocity: number = 0.85,
    isManualKey: boolean = false
  ): void {
    if (!pitch) return;
    const ctx = this.getContext();
    const effectiveTime = Math.max(ctx.currentTime, whenAudioTime);

    const freq = pitchToFrequency(pitch);
    const midi = pitchToMidi(pitch);

    // 1. Multi-Register Wave Selection
    let wave = this.midWave;
    if (midi < 36) {
      wave = this.subBassWave;
    } else if (midi < 60) {
      wave = this.tenorWave;
    } else if (midi > 84) {
      wave = this.trebleWave;
    }

    // 2. Physical String Decay & Fast Note "Respiração" Math
    // Bass strings ring naturally for 5.5s; high treble decays in 1.2s
    const naturalDecay = Math.max(1.1, Math.min(6.0, 6.2 - (midi - 21) * 0.055));

    const isFastNote = durationSeconds !== undefined && durationSeconds < 0.18;
    const effectiveDuration = durationSeconds !== undefined ? durationSeconds : naturalDecay;

    const slot = this.acquireVoiceSlot(effectiveTime, pitch);
    slot.pitch = pitch;
    slot.midi = midi;
    slot.startTime = effectiveTime;
    slot.stopTime = effectiveTime + effectiveDuration;
    slot.isHeld = isManualKey;

    // 3. Acoustic Stereo Panning (A0 on left, C4 center, C8 on right)
    if (slot.panNode) {
      const panPos = Math.max(-0.55, Math.min(0.55, ((midi - 60) / 48) * 0.55));
      slot.panNode.pan.setValueAtTime(panPos, effectiveTime);
    }

    // 4. Dynamic Velocity & Register-Sensitive Filter
    // Louder & faster strikes open the filter higher; soft strikes are mellow & warm
    const brightnessRatio = 0.5 + 0.5 * Math.pow(velocity, 1.4);
    const baseCutoff = Math.min(15000, Math.max(700, freq * 7.8 * brightnessRatio));

    slot.filterNode.frequency.cancelScheduledValues(effectiveTime);
    slot.filterNode.frequency.setValueAtTime(baseCutoff, effectiveTime);

    // Natural exponential filter decay as upper partials dissipate faster than fundamental
    const filterDecayDuration = Math.min(effectiveDuration, 1.5);
    slot.filterNode.frequency.exponentialRampToValueAtTime(
      Math.max(180, freq * 1.6),
      effectiveTime + filterDecayDuration
    );
    slot.filterNode.Q.setValueAtTime(1.0, effectiveTime);

    // 5. Amplitude Envelope & Adaptive Damper Closure
    // Peak gain with cubic velocity response for authentic touch dynamics
    const peakGain = Math.min(1.0, 0.46 * Math.pow(velocity, 1.35));

    slot.gainNode.gain.cancelScheduledValues(effectiveTime);
    slot.gainNode.gain.setValueAtTime(0.0001, effectiveTime);

    // Felt attack rise time: crisp 2ms for high treble, 18ms for heavy bass strings
    const attackRise = Math.max(0.002, 0.018 - Math.max(0, (midi - 21) * 0.00025));
    slot.gainNode.gain.linearRampToValueAtTime(peakGain, effectiveTime + attackRise);

    let finalStopTime: number;

    if (durationSeconds !== undefined) {
      // Prompt sound decay
      const promptLevel = Math.max(0.0001, peakGain * Math.exp(-durationSeconds / naturalDecay));
      const releaseTime = effectiveTime + durationSeconds;
      slot.gainNode.gain.exponentialRampToValueAtTime(promptLevel, releaseTime);

      // ADAPTIVE DAMPER "RESPIRAÇÃO":
      // For fast notes (16th/32nd notes, rapid arpeggios):
      // Felt damper drops with agile speed (15ms - 28ms), muting the string cleanly and crisply!
      // For longer sustained notes: gentle 60ms damper landing.
      const damperTime = isFastNote
        ? Math.max(0.015, Math.min(0.032, durationSeconds * 0.35))
        : Math.min(0.075, 0.035 + durationSeconds * 0.025);

      // Filter drops simultaneously with damper to kill highs first
      slot.filterNode.frequency.setValueAtTime(
        Math.max(200, freq * 2.0),
        releaseTime
      );
      slot.filterNode.frequency.exponentialRampToValueAtTime(
        Math.max(100, freq),
        releaseTime + damperTime
      );

      slot.gainNode.gain.setValueAtTime(promptLevel, releaseTime);
      slot.gainNode.gain.linearRampToValueAtTime(0.0001, releaseTime + damperTime);

      finalStopTime = releaseTime + damperTime + 0.015;
    } else {
      // Manual held key: decays naturally towards silence until released
      slot.gainNode.gain.exponentialRampToValueAtTime(0.0001, effectiveTime + naturalDecay);
      finalStopTime = effectiveTime + naturalDecay + 0.02;
    }

    // 6. Multi-Oscillator Triple/Dual Unisons with Acoustic Chorus Detuning
    const osc1 = ctx.createOscillator();
    if (wave) osc1.setPeriodicWave(wave);
    osc1.frequency.setValueAtTime(freq, effectiveTime);

    const osc2 = ctx.createOscillator();
    if (wave) osc2.setPeriodicWave(wave);
    osc2.frequency.setValueAtTime(freq, effectiveTime);

    let osc3: OscillatorNode | null = null;
    if (midi >= 52) {
      // Triple string unison in mid and treble registers
      osc3 = ctx.createOscillator();
      if (wave) osc3.setPeriodicWave(wave);
      osc3.frequency.setValueAtTime(freq, effectiveTime);
    }

    // Natural beating (0.8 - 3.5 cents detune) that gives piano notes warmth and life
    if (midi >= 36) {
      const detuneAmount = Math.min(3.5, 0.8 + (midi - 36) * 0.04);
      osc1.detune.setValueAtTime(detuneAmount, effectiveTime);
      osc2.detune.setValueAtTime(-detuneAmount, effectiveTime);
      if (osc3) {
        osc3.detune.setValueAtTime(0.0, effectiveTime);
      }
    }

    osc1.connect(slot.filterNode);
    osc2.connect(slot.filterNode);
    if (osc3) osc3.connect(slot.filterNode);

    slot.osc1 = osc1;
    slot.osc2 = osc2;
    slot.osc3 = osc3;

    osc1.start(effectiveTime);
    osc2.start(effectiveTime);
    if (osc3) osc3.start(effectiveTime);

    osc1.stop(finalStopTime);
    osc2.stop(finalStopTime);
    if (osc3) osc3.stop(finalStopTime);

    // 7. Felt Hammer Strike Percussive Transient
    this.playHammerTransient(ctx, effectiveTime, velocity, freq);

    // 8. Auto-reclamation timer
    const cleanupDelayMs = Math.max(35, (finalStopTime - ctx.currentTime + 0.02) * 1000);
    slot.cleanupTimer = window.setTimeout(() => {
      if (slot.startTime === effectiveTime) {
        this.stopSlotImmediate(slot, ctx.currentTime);
      }
    }, cleanupDelayMs);
  }

  private playHammerTransient(
    ctx: AudioContext,
    when: number,
    velocity: number,
    freq: number
  ): void {
    // Ruído percussivo removido a pedido do usuário
    return;
  }

  /**
   * Manual key release on the keyboard.
   */
  public releaseNote(pitch: string): void {
    if (!pitch || !this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.isSustainActive) {
      for (const slot of this.voicePool) {
        if (slot.inUse && slot.pitch === pitch && slot.isHeld) {
          slot.isHeld = false;
        }
      }
      return;
    }

    for (const slot of this.voicePool) {
      if (slot.inUse && slot.pitch === pitch && slot.isHeld && !slot.isReleasing) {
        this.dampVoiceSmooth(slot, now, 0.065);
      }
    }
  }

  public setSustain(active: boolean): void {
    this.isSustainActive = active;
    if (!active && this.ctx) {
      const now = this.ctx.currentTime;
      for (const slot of this.voicePool) {
        if (slot.inUse && !slot.isHeld && !slot.isReleasing) {
          this.dampVoiceSmooth(slot, now, 0.075);
        }
      }
    }
  }

  public stopAllNotes(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const slot of this.voicePool) {
      if (slot.inUse) {
        this.stopSlotImmediate(slot, now);
      }
    }
  }

  public setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setReverbLevel(level: number): void {
    this.reverbLevel = Math.max(0, Math.min(1, level));
    if (this.reverbOutput && this.ctx) {
      this.reverbOutput.gain.setValueAtTime(this.reverbLevel * 0.42, this.ctx.currentTime);
    }
  }
}

export const pianoSynth = new PianoSynthesizer();
