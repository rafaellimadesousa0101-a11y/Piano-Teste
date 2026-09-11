import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  `const handleAddMeasure = () => {`,
  `const handleAddMeasure = useCallback(() => {`
).replace(
  `    setSheet((prev) => ({ ...prev, measures: updatedMeasures }));
  };`,
  `    setSheet((prev) => ({ ...prev, measures: updatedMeasures }));
  }, [sheet, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleRemoveMeasure = () => {`,
  `const handleRemoveMeasure = useCallback(() => {`
).replace(
  `    setSelectedMeasureIndex(null);
  };`,
  `    setSelectedMeasureIndex(null);
  }, [sheet, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleClearSheet = () => {`,
  `const handleClearSheet = useCallback(() => {`
).replace(
  `      measures: [],
    }));
  };`,
  `      measures: [],
    }));
  }, []);`
);

content = content.replace(
  `const handleDeleteSelectedNote = () => {`,
  `const handleDeleteSelectedNote = useCallback(() => {`
).replace(
  `      return updated;
    });
  };`,
  `      return updated;
    });
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleToggleSelectedNoteDotted = () => {`,
  `const handleToggleSelectedNoteDotted = useCallback(() => {`
).replace(
  `      return updated;
    });
  };`,
  `      return updated;
    });
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleToggleSelectedArpeggio = () => {`,
  `const handleToggleSelectedArpeggio = useCallback(() => {`
).replace(
  `      return updated;
    });
  };`,
  `      return updated;
    });
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleSetSelectedStemDirection = (direction: "up" | "down" | "auto") => {`,
  `const handleSetSelectedStemDirection = useCallback((direction: "up" | "down" | "auto") => {`
).replace(
  `      return updated;
    });
  };`,
  `      return updated;
    });
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleSetSelectedVoice = (voice: 1 | 2 | undefined) => {`,
  `const handleSetSelectedVoice = useCallback((voice: 1 | 2 | undefined) => {`
).replace(
  `      return updated;
    });
  };`,
  `      return updated;
    });
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleSelectClef = (clef: ClefSelection) => {`,
  `const handleSelectClef = useCallback((clef: ClefSelection) => {`
).replace(
  `    setCurrentClef(clef);
  };`,
  `    setCurrentClef(clef);
  }, []);`
);

content = content.replace(
  `const handleSelectHandsMode = (mode: ClefSelection) => {`,
  `const handleSelectHandsMode = useCallback((mode: ClefSelection) => {`
).replace(
  `    setHandsMode(mode);
  };`,
  `    setHandsMode(mode);
  }, []);`
);

content = content.replace(
  `const handleSelectPreset = (preset: SheetMusic) => {`,
  `const handleSelectPreset = useCallback((preset: SheetMusic) => {`
).replace(
  `    setGeneratedNotification(\`Partitura carregada: "\${preset.title}"\`);
  };`,
  `    setGeneratedNotification(\`Partitura carregada: "\${preset.title}"\`);
  }, [handleStopPlayback]);`
);

content = content.replace(
  `const handleTransposeSelectedNote = (semitones: number) => {`,
  `const handleTransposeSelectedNote = useCallback((semitones: number) => {`
).replace(
  `    });
    pianoSynth.playNote(newPitch, 0.45, 0.8);
  };`,
  `    });
    pianoSynth.playNote(newPitch, 0.45, 0.8);
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleAddIntervalToSelectedNote = (`,
  `const handleAddIntervalToSelectedNote = useCallback((`
).replace(
  `    });
    pianoSynth.playNote(newPitch, 0.45, 0.8);
  };`,
  `    });
    pianoSynth.playNote(newPitch, 0.45, 0.8);
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handleRemovePitchFromSelectedNote = (pitchToRemove: string) => {`,
  `const handleRemovePitchFromSelectedNote = useCallback((pitchToRemove: string) => {`
).replace(
  `      return updated;
    });
  };`,
  `      return updated;
    });
  }, [selectedNote, selectedMeasureIndex]);`
);

content = content.replace(
  `const handlePlayAudition = (pitch: string) => {`,
  `const handlePlayAudition = useCallback((pitch: string) => {`
).replace(
  `    pianoSynth.playNote(pitch, 0.4, 0.7);
  };`,
  `    pianoSynth.playNote(pitch, 0.4, 0.7);
  }, []);`
);

// We need to fix the inline functions
content = content.replace(
  `onToggleLoop={() => setIsLooping((l) => !l)}`,
  `onToggleLoop={useCallback(() => setIsLooping((l) => !l), [])}`
).replace(
  `onOpenAiModal={() => setIsAiModalOpen(true)}`,
  `onOpenAiModal={useCallback(() => setIsAiModalOpen(true), [])}`
).replace(
  `onOpenAiModal={() => setIsAiModalOpen(true)}`,
  `onOpenAiModal={useCallback(() => setIsAiModalOpen(true), [])}`
).replace(
  `onOpenReductionModal={() => setIsReductionModalOpen(true)}`,
  `onOpenReductionModal={useCallback(() => setIsReductionModalOpen(true), [])}`
).replace(
  `onOpenReductionModal={() => setIsReductionModalOpen(true)}`,
  `onOpenReductionModal={useCallback(() => setIsReductionModalOpen(true), [])}`
).replace(
  `onTogglePianoInsertMode={() => setIsPianoInsertMode((m) => !m)}`,
  `onTogglePianoInsertMode={useCallback(() => setIsPianoInsertMode((m) => !m), [])}`
).replace(
  `onToggleRest={() => setIsRestSelected((prev) => !prev)}`,
  `onToggleRest={useCallback(() => setIsRestSelected((prev) => !prev), [])}`
).replace(
  `onToggleDotted={() => setIsDottedSelected((prev) => !prev)}`,
  `onToggleDotted={useCallback(() => setIsDottedSelected((prev) => !prev), [])}`
);

fs.writeFileSync('src/App.tsx', content);
