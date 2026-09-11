import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  '<section aria-label="Ferramentas de Edição da Partitura" className="w-full">',
  '<section aria-label="Ferramentas de Edição da Partitura" className="w-full hidden md:block">'
);

fs.writeFileSync('src/App.tsx', content);
