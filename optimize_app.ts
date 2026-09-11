import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  `const handleChangeBpm = (newBpm: number) => {`,
  `const handleChangeBpm = useCallback((newBpm: number) => {`
);
content = content.replace(
  `    }
  };`,
  `    }
  }, [isPlaying, handleStopPlayback]);`
);

fs.writeFileSync('src/App.tsx', content);
