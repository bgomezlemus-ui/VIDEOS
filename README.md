# Remotion Video Editor Setup

Setup completo de Remotion con FFmpeg para edición automática de videos.

## 📋 Requisitos

- Node.js 18+ (v22.22.2 instalada ✓)
- npm o yarn
- FFmpeg (se instala automáticamente con `ffmpeg-static`)

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

Esto instalará:
- **Remotion 4.0+** - Framework de edición de videos programática
- **FFmpeg Static** - FFmpeg compilado estáticamente (sin dependencias del sistema)
- **React 18** - Para crear componentes de video

### 2. Estructura del proyecto

```
VIDEOS/
├── src/
│   ├── index.tsx              # Punto de entrada principal
│   ├── compositions/          # Tus composiciones de video
│   │   └── HelloWorld.tsx    # Ejemplo inicial
│   └── components/            # Componentes reutilizables
├── remotion.config.ts         # Configuración de Remotion
├── tsconfig.json              # Configuración de TypeScript
├── package.json               # Dependencias del proyecto
└── out/                        # Videos renderizados
```

## 📹 Scripts disponibles

### Preview (Editor en vivo)
```bash
npm start
```
Abre el editor de Remotion en `http://localhost:3000`

### Renderizar video
```bash
npm run build
```
Renderiza la composición `HelloWorld` a `out/video.mp4`

O renderiza una composición específica:
```bash
npm run render -- --composition=HelloWorld
```

### Opciones de renderizado avanzadas (CLI oficial)

Para opciones avanzadas usa el CLI de Remotion directamente:

```bash
# Renderizar una composición específica
npx remotion render HelloWorld out/video.mp4

# Renderizar en formato WebM (VP8)
npx remotion render HelloWorld out/video.webm --codec=vp8

# Cambiar calidad (CRF, menor = mejor calidad)
npx remotion render HelloWorld out/video.mp4 --crf=18

# Especificar número de workers (paralelización)
npx remotion render HelloWorld out/video.mp4 --concurrency=4
```

> El script `npm run render` (scripts/render.mjs) acepta `--composition` y
> `--output`. Para el resto de flags usa `npx remotion render`.

## 🎬 Crear una nueva composición

1. Crea un archivo nuevo en `src/compositions/MiVideo.tsx`:

```typescript
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const MiVideo: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ background: 'white' }}>
      <h1>Mi Video - Frame {frame}</h1>
    </AbsoluteFill>
  );
};
```

2. Regístrala en `src/index.tsx`:

```typescript
<Composition
  id="MiVideo"
  component={MiVideo}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
/>
```

## ⚙️ Configuración de FFmpeg

FFmpeg se instala automáticamente a través de `ffmpeg-static`. No necesitas instalarlo manualmente.

**Ubicación**: `node_modules/ffmpeg-static/ffmpeg` (Linux/Mac) o `.exe` (Windows)

Remotion lo configura automáticamente en `remotion.config.ts`

## 🎨 Características principales

- **Render programático**: Renderiza videos desde código
- **Componentes React**: Usa componentes React para crear frames
- **Animaciones suaves**: Usa `useCurrentFrame()` para animaciones
- **Múltiples codecs**: Soporta H.264, VP8, ProRes, etc.
- **Múltiples resoluciones**: 1080p, 2K, 4K, o custom
- **Audio**: Integra audio, música y efectos de sonido

## 📚 Documentación útil

- [Remotion Docs](https://www.remotion.dev/docs)
- [API Reference](https://www.remotion.dev/docs/api)
- [Examples](https://www.remotion.dev/docs/examples)

## 🛠️ Troubleshooting

### Problema: "FFmpeg no encontrado"
✓ Ya está resuelto - se instala con `ffmpeg-static`

### Problema: "Error de navegador Chrome/Chromium"
```bash
export CHROME_BIN=/path/to/chrome
npm start
```

### Problema: "Memoria insuficiente"
Reduce concurrency:
```bash
npm run render -- --concurrency=2
```

## 📝 Próximos pasos

1. Ejecutar `npm install`
2. Explorar ejemplos en `src/compositions/`
3. Crear tu primera composición personalizada
4. Renderizar videos con `npm run build`

¡Happy rendering! 🎉
