import { Config } from '@remotion/cli/config';
import fs from 'fs';

Config.setVideoImageFormat('jpeg');
Config.setCodec('h264');
Config.setOverwriteOutput(true);

// Usar el Chromium preinstalado del entorno si está disponible,
// evitando la descarga automática de Chrome Headless Shell.
const browserCandidates = [
	process.env.REMOTION_BROWSER_EXECUTABLE,
	process.env.CHROME_BIN,
	'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
	'/opt/pw-browsers/chromium',
].filter(Boolean) as string[];

for (const candidate of browserCandidates) {
	if (fs.existsSync(candidate)) {
		Config.setBrowserExecutable(candidate);
		break;
	}
}
