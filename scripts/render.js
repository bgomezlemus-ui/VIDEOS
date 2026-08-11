#!/usr/bin/env node

import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const outDir = path.join(projectRoot, 'out');
const ffmpegPath = path.join(projectRoot, 'node_modules', 'ffmpeg-static', 'ffmpeg');

// Crear directorio de salida si no existe
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const args = process.argv.slice(2);
let composition = 'HelloWorld';
let outputPath = path.join(outDir, 'video.mp4');

// Parsear argumentos
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--composition' && args[i + 1]) {
    composition = args[i + 1];
    i++;
  }
  if (args[i] === '--output' && args[i + 1]) {
    outputPath = args[i + 1];
    i++;
  }
}

console.log('\n🎬 Remotion Render Script');
console.log('========================\n');
console.log(`📹 Composition: ${composition}`);
console.log(`📁 Output: ${outputPath}`);
console.log(`🔧 FFmpeg: ${ffmpegPath}`);
console.log('');

// Verificar que FFmpeg existe
if (!fs.existsSync(ffmpegPath)) {
  console.error('❌ FFmpeg not found at:', ffmpegPath);
  console.error('Run: npm install');
  process.exit(1);
}

// Por ahora, crear un video de prueba simple
console.log('⏳ Preparing to render (this would use Remotion API in production)...\n');

// Crear un archivo de información
const infoFile = path.join(outDir, `${composition}-render-info.json`);
const info = {
  composition,
  outputPath,
  ffmpegPath,
  timestamp: new Date().toISOString(),
  settings: {
    fps: 30,
    width: 1920,
    height: 1080,
    codec: 'h264',
    duration: 5,
  },
};

fs.writeFileSync(infoFile, JSON.stringify(info, null, 2));

console.log('✅ Render configuration saved!');
console.log(`📄 Info: ${infoFile}`);
console.log('\n💡 To use the full Remotion API, configure a proper dev server.');
console.log('   For production rendering, see the ADVANCED.md guide.\n');
