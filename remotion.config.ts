import { Config } from 'remotion';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Config.setCodec('h264');
Config.setAudioCodec('aac');
Config.setFps(30);
Config.setHeight(1080);
Config.setWidth(1920);
Config.setDurationInFrames(150);

// Configurar FFmpeg
const ffmpegPath = path.join(__dirname, 'node_modules', 'ffmpeg-static', 'ffmpeg');
Config.setFfmpegExecutable(ffmpegPath);

// Configurar configuraciones de salida
Config.setOutputFormat('mp4');
Config.setBrowserExecutable(process.env.CHROME_BIN || undefined);
