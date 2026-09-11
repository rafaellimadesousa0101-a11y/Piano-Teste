import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  `const handleTouchStart = (e: React.TouchEvent) => {`,
  `const handleTouchStart = useCallback((e: React.TouchEvent) => {`
).replace(
  `    touchStartX.current = e.changedTouches[0].screenX;
  };`,
  `    touchStartX.current = e.changedTouches[0].screenX;
  }, []);`
);

content = content.replace(
  `const handleTouchEnd = (e: React.TouchEvent) => {`,
  `const handleTouchEnd = useCallback((e: React.TouchEvent) => {`
).replace(
  `      // Future: swiping interaction logic here
    }
  };`,
  `      // Future: swiping interaction logic here
    }
  }, []);`
);

fs.writeFileSync('src/App.tsx', content);
