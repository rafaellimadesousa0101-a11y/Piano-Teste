import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

const fixLines = [210, 233];

for (const num of fixLines) {
  const idx = num - 1;
  if (lines[idx].trim() === '};') {
    lines[idx] = lines[idx].replace('};', '}, []);');
  }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
