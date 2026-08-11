#!/usr/bin/env node

import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const outDir = path.join(projectRoot, 'out');

if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

const detectBrowser = () => {
	const candidates = [
		process.env.REMOTION_BROWSER_EXECUTABLE,
		process.env.CHROME_BIN,
		'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
		'/opt/pw-browsers/chromium',
	].filter(Boolean);
	for (const c of candidates) {
		if (fs.existsSync(c)) return c;
	}
	return null;
};
const browserExecutable = detectBrowser();

const args = process.argv.slice(2);
let compositionId = 'HelloWorld';
let outputPath = path.join(outDir, 'video.mp4');

for (let i = 0; i < args.length; i++) {
	if (args[i] === '--composition' && args[i + 1]) {
		compositionId = args[i + 1];
		i++;
	}
	if (args[i] === '--output' && args[i + 1]) {
		outputPath = path.isAbsolute(args[i + 1])
			? args[i + 1]
			: path.join(projectRoot, args[i + 1]);
		i++;
	}
}

console.log('\n🎬 Remotion Render');
console.log('==================\n');
console.log(`📹 Composition: ${compositionId}`);
console.log(`📁 Output:      ${outputPath}`);
console.log(`🌐 Browser:     ${browserExecutable || 'auto-download'}\n`);

console.log('📦 Bundling project...');
const bundleLocation = await bundle({
	entryPoint: path.join(projectRoot, 'src', 'index.tsx'),
	onProgress: (p) => {
		process.stdout.write(`\r   Bundling: ${p}%   `);
	},
});
console.log('\n✓ Bundle ready\n');

console.log('🔍 Selecting composition...');
const composition = await selectComposition({
	serveUrl: bundleLocation,
	id: compositionId,
	browserExecutable,
});
console.log(`✓ Found "${composition.id}" (${composition.width}x${composition.height} @ ${composition.fps}fps, ${composition.durationInFrames} frames)\n`);

console.log('🎞️  Rendering video...');
await renderMedia({
	composition,
	serveUrl: bundleLocation,
	codec: 'h264',
	outputLocation: outputPath,
	browserExecutable,
	onProgress: ({ progress }) => {
		process.stdout.write(`\r   Rendering: ${Math.round(progress * 100)}%   `);
	},
});

console.log('\n\n✅ Render completed!');
console.log(`📹 Video saved to: ${outputPath}\n`);
