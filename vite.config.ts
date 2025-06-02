import solid from "solid-start/vite";
import { defineConfig } from "vite";
//@ts-ignore
import fs from 'fs';

export default defineConfig({
  base: '/butterchurn-recorder/',
  plugins: [
    solid({
      ssr: false
    }),
    {
      name: 'generate-json-file',
      generateBundle() {
        const AUDIO_PATH = 'public/audio';
        const files : string[] = fs.readdirSync(AUDIO_PATH);
        var collator = new Intl.Collator([], {numeric: true});
        const filenames = files.sort((a, b) => collator.compare(a, b))
        fs.writeFileSync('public/audioFiles.json', JSON.stringify(filenames));
      }    
    }
  ]
})