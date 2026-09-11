import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');
const lines = content.split('\n');

const fixLines = [393, 403, 419, 436, 459, 481, 485, 516, 538, 569, 596, 622, 628, 633];

for (const num of fixLines) {
  // Line numbers are 1-based, array is 0-based
  const idx = num - 1;
  if (lines[idx].trim() === '};') {
    lines[idx] = lines[idx].replace('};', '}, []);');
  }
}

fs.writeFileSync('src/App.tsx', lines.join('\n'));
