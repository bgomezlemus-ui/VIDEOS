# Guía Avanzada de Remotion + FFmpeg

## 🎯 Renderizado Avanzado

### Renderizar con calidad personalizada

```bash
# 4K (3840x2160) a 60fps
npm run render -- --width=3840 --height=2160 --fps=60

# Full HD con bitrate alto
npm run render -- --width=1920 --height=1080 --quality=100 --video-bitrate=12000k

# Formato WebM (VP8)
npm run render -- --codec=vp8 --output=out/video.webm

# ProRes para edición profesional
npm run render -- --codec=prores-422 --output=out/video.mov
```

### Rendizado con paralelización

```bash
# Usar 8 workers para renderizado más rápido
npm run render -- --concurrency=8

# Usar 1 worker (menos memoria)
npm run render -- --concurrency=1
```

### Audio

```bash
# Renderizar solo video (sin audio)
npm run render -- --disable-audio

# Renderizar solo audio
npm run render -- --audio-only --audio-codec=aac

# Cambiar bitrate de audio
npm run render -- --audio-bitrate=192k
```

## 🎬 Composiciones Avanzadas

### Usar imágenes en tu video

```typescript
import { Img } from 'remotion';

export const VideoWithImage = () => (
  <AbsoluteFill>
    <Img 
      src="/path/to/image.png" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  </AbsoluteFill>
);
```

### Usar video dentro de video

```typescript
import { Video } from 'remotion';

export const NestedVideo = () => (
  <AbsoluteFill>
    <Video src="/path/to/video.mp4" />
  </AbsoluteFill>
);
```

### Usar audio

```typescript
import { Audio } from 'remotion';

export const VideoWithAudio = () => (
  <AbsoluteFill>
    <Audio src="/path/to/audio.mp3" />
    {/* Tu contenido visual aquí */}
  </AbsoluteFill>
);
```

## 🎨 Animaciones

### Spring animations

```typescript
import { spring, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const springValue = spring({
  frame,
  fps,
  config: {
    damping: 10,
    mass: 1,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },
});
```

### Interpolación

```typescript
import { interpolate } from 'remotion';

// Cambio de opacidad de 0 a 1 en frames 0-30
const opacity = interpolate(
  frame,
  [0, 30],
  [0, 1],
  {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }
);

// Colores animados
const color = interpolate(
  frame,
  [0, 150],
  [
    // Rojo a azul
    0xFF0000, 
    0x0000FF
  ]
);
```

## 📊 Performance

### Optimizar renderizado

1. **Reduce resolución durante desarrollo**
   ```typescript
   Config.setHeight(540);
   Config.setWidth(960);
   ```

2. **Usa CSS transforms en lugar de cambiar dimensiones**
   ```tsx
   // Bueno ✓
   style={{ transform: 'scale(1.5)' }}
   
   // Menos eficiente ✗
   style={{ width: 150 }}
   ```

3. **Memoiza componentes costosos**
   ```typescript
   const HeavyComponent = React.memo(({ frame }) => {
     return <ExpensiveRender key={frame} />;
   });
   ```

## 🔧 Configuración de FFmpeg

### Cambiar codec de video

```typescript
// H.264 (máxima compatibilidad)
Config.setCodec('h264');

// VP8 (WebM, open source)
Config.setCodec('vp8');

// ProRes (edición profesional)
Config.setCodec('prores-422');

// H.265 (mejor compresión)
Config.setCodec('h265');
```

### Configurar FFmpeg personalizado

```typescript
import { execSync } from 'child_process';

const ffmpegPath = process.env.CUSTOM_FFMPEG_PATH || 
  './node_modules/ffmpeg-static/ffmpeg';

Config.setFfmpegExecutable(ffmpegPath);
```

## 📁 Estructura de proyecto recomendada

```
src/
├── compositions/          # Tus videos
│   ├── HelloWorld.tsx
│   ├── Tutorial.tsx
│   └── Intro.tsx
├── components/           # Componentes reutilizables
│   ├── Title.tsx
│   ├── Subtitle.tsx
│   └── Background.tsx
├── assets/              # Imágenes, videos, audios
│   ├── images/
│   ├── videos/
│   └── audio/
├── utils/               # Utilidades
│   ├── animations.ts
│   ├── colors.ts
│   └── constants.ts
└── index.tsx            # Punto de entrada
```

## 🐛 Debugging

### Ver logs de renderizado

```bash
DEBUG=remotion:* npm run render
```

### Detener renderizado y continuar después

```bash
# Interrumpir con Ctrl+C
# El siguiente render continuará desde donde se paró
npm run render -- --concurrency=1
```

## 🚀 CI/CD Integration

### GitHub Actions

```yaml
name: Render Video
on: [push]

jobs:
  render:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run render
      - uses: actions/upload-artifact@v2
        with:
          name: video
          path: out/
```

## 📚 Recursos

- [Remotion Docs](https://www.remotion.dev)
- [FFmpeg Docs](https://ffmpeg.org/documentation.html)
- [React Hooks](https://react.dev/reference/react)
- [Remotion GitHub](https://github.com/remotion-dev/remotion)
