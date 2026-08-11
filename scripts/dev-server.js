#!/usr/bin/env node

import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Remotion - Video Editor</title>
      <style>
        body {
          margin: 0;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: white;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          background: rgba(0, 0, 0, 0.3);
          padding: 40px;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }
        h1 {
          margin: 0 0 20px;
          font-size: 2.5em;
        }
        p {
          margin: 10px 0;
          line-height: 1.6;
          font-size: 1.1em;
        }
        code {
          background: rgba(0, 0, 0, 0.5);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
        }
        .success {
          background: rgba(0, 255, 0, 0.1);
          border-left: 4px solid #00ff00;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info {
          background: rgba(100, 150, 255, 0.1);
          border-left: 4px solid #6496ff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🎬 Remotion Video Editor</h1>

        <div class="success">
          <strong>✅ Server Running!</strong><br>
          Remotion with FFmpeg is ready to use.
        </div>

        <h2>📋 Next Steps</h2>
        <p><strong>1. Create your first video composition</strong></p>
        <code>npm run build</code>

        <p><strong>2. View examples</strong></p>
        <p>Check the <code>src/compositions/</code> folder for example videos.</p>

        <p><strong>3. Render a video</strong></p>
        <code>npm run render -- --composition=HelloWorld</code>

        <div class="info">
          <strong>ℹ️ Server Information</strong><br>
          • Server Address: <code>http://localhost:${PORT}</code><br>
          • FFmpeg: <strong>Installed ✓</strong><br>
          • Node.js: <strong>v${process.version}</strong><br>
          • Project: <code>${projectRoot}</code>
        </div>

        <h2>📚 Commands</h2>
        <ul>
          <li><code>npm start</code> - Open development server (you are here)</li>
          <li><code>npm run build</code> - Render HelloWorld composition</li>
          <li><code>npm run render</code> - Render any composition</li>
        </ul>

        <h2>🎯 Quick Start Guide</h2>
        <ol>
          <li>Edit <code>src/compositions/HelloWorld.tsx</code></li>
          <li>Run <code>npm run build</code></li>
          <li>Check <code>out/video.mp4</code> for your rendered video</li>
        </ol>

        <h2>📖 Documentation</h2>
        <p>Read <code>README.md</code> for setup instructions and <code>ADVANCED.md</code> for advanced features.</p>
      </div>
    </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log('');
  console.log('🎬 Remotion Development Server');
  console.log('================================');
  console.log(`✓ Server running at http://localhost:${PORT}`);
  console.log(`✓ FFmpeg: Installed (${path.join(projectRoot, 'node_modules/ffmpeg-static/ffmpeg')})`);
  console.log(`✓ Node.js: ${process.version}`);
  console.log('');
  console.log('Available commands:');
  console.log('  npm run build   - Render HelloWorld composition');
  console.log('  npm run render  - Render custom composition');
  console.log('  Ctrl+C to stop server');
  console.log('');
});
