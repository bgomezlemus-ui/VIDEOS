#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const ffmpegPath = path.join(projectRoot, 'node_modules', 'ffmpeg-static', 'ffmpeg');
const ffprobePath = path.join(projectRoot, 'node_modules', 'ffmpeg-static', 'ffprobe');

console.log('🎬 Configurando FFmpeg para Remotion...\n');

try {
	// Verificar si FFmpeg existe
	if (fs.existsSync(ffmpegPath)) {
		console.log('✓ FFmpeg encontrado en:', ffmpegPath);

		// Hacer ejecutable
		if (process.platform !== 'win32') {
			fs.chmodSync(ffmpegPath, '755');
		}
	} else {
		console.error('✗ FFmpeg no encontrado. Ejecuta: npm install');
		process.exit(1);
	}

	// Verificar versión de FFmpeg
	try {
		const version = execSync(`"${ffmpegPath}" -version`).toString().split('\n')[0];
		console.log('✓ Versión:', version.substring(0, 50));
	} catch (e) {
		console.warn('⚠ No se pudo verificar la versión de FFmpeg');
	}

	console.log('\n✅ FFmpeg configurado correctamente!');
	console.log('\nPróximos pasos:');
	console.log('  npm start     - Abrir editor en vivo');
	console.log('  npm run build - Renderizar video');

} catch (error) {
	console.error('✗ Error durante la configuración:', error.message);
	process.exit(1);
}
