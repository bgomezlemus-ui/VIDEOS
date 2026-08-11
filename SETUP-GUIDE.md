# 🎬 Remotion + FFmpeg Setup Completo

## ✅ Estado de Instalación

Tu entorno está completamente configurado. Aquí está lo que tienes:

### Instalado
- ✅ **Node.js v22.22.2** - Runtime de JavaScript
- ✅ **Remotion 4.0.508** - Framework de edición de video programática
- ✅ **React 18.2** - Librería UI para componentes
- ✅ **FFmpeg 7.0.2** - Herramienta de procesamiento de video
- ✅ **TypeScript 5.3** - Lenguaje con tipos
- ✅ **FFmpeg-static** - FFmpeg compilado (sin dependencias del sistema)

### Configuración
- ✅ Resolución: 1920x1080 (Full HD)
- ✅ FPS: 30 frames por segundo
- ✅ Codec: H.264 (máxima compatibilidad)
- ✅ Audio: AAC
- ✅ Formato de salida: MP4

## 🚀 Inicio Rápido

### 1. Ver el servidor de desarrollo
```bash
npm start
```
Abre http://localhost:3000 en tu navegador

### 2. Renderizar tu primer video
```bash
npm run render -- --composition=HelloWorld
```

El video se guardará en `out/video.mp4`

### 3. Editar una composición
Abre `src/compositions/HelloWorld.tsx` y modifica el contenido:

```typescript
export const HelloWorld: React.FC = () => {
  // Aquí va tu código React
  return (
    <AbsoluteFill>
      <h1>¡Mi Primer Video!</h1>
    </AbsoluteFill>
  );
};
```

## 📂 Estructura del Proyecto

```
/VIDEOS/
├── src/
│   ├── index.tsx                      # Punto de entrada (registerRoot)
│   ├── Root.tsx                       # Registro de composiciones
│   ├── compositions/                  # Tus videos
│   │   ├── HelloWorld.tsx            # Ejemplo básico
│   │   └── AnimatedText.tsx          # Ejemplo con animaciones
│   ├── components/                    # Componentes reutilizables
│   └── utils/                         # Funciones de ayuda
├── scripts/
│   ├── render.mjs                    # Script de renderizado (API)
│   └── setup-ffmpeg.js               # Verificación de FFmpeg
├── out/                               # Videos renderizados
├── remotion.config.ts                # Config de Remotion
├── package.json                      # Dependencias
├── tsconfig.json                     # Config de TypeScript
├── README.md                         # Documentación básica
└── ADVANCED.md                       # Guía avanzada
```

## 📝 Crear una Nueva Composición

### Paso 1: Crear archivo
`src/compositions/MiVideo.tsx`:

```typescript
import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const MiVideo: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ background: '#667eea' }}>
      <h1>Mi Video - Frame {frame}</h1>
    </AbsoluteFill>
  );
};
```

### Paso 2: Registrar en index.tsx
Abre `src/index.tsx` y añade:

```typescript
import { MiVideo } from './compositions/MiVideo';

// Dentro del RemotionRoot:
<Composition
  id="MiVideo"
  component={MiVideo}
  durationInFrames={150}
  fps={30}
  width={1920}
  height={1080}
/>
```

### Paso 3: Renderizar
```bash
npm run render -- --composition=MiVideo
```

## 🎨 Ejemplos de Composiciones

### Texto simple
```typescript
<AbsoluteFill style={{ background: 'white' }}>
  <h1 style={{ color: 'black', fontSize: '80px' }}>Hola</h1>
</AbsoluteFill>
```

### Animación de entrada
```typescript
const opacity = interpolate(
  frame,
  [0, 30],  // frames
  [0, 1]    // valores
);

<div style={{ opacity }}>Contenido</div>
```

### Colores degradados
```typescript
<div style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  width: '100%',
  height: '100%',
}}>
  Contenido aquí
</div>
```

## 🔧 Comandos Importantes

```bash
# Instalar dependencias
npm install

# Ver servidor en desarrollo
npm start

# Renderizar composición predeterminada
npm run build

# Renderizar composición específica
npm run render -- --composition=MiVideo

# Renderizar en diferentes formatos
npm run render -- --codec=vp8 --output=out/video.webm
npm run render -- --codec=prores-422 --output=out/video.mov

# Verificar FFmpeg
node scripts/setup-ffmpeg.js
```

## 📊 FFmpeg - Información

**Versión:** 7.0.2
**Ubicación:** `node_modules/ffmpeg-static/ffmpeg`
**Estado:** ✅ Instalado y funcionando

FFmpeg se usa automáticamente cuando renderizas videos. No necesitas hacer nada especial.

### Codecs disponibles
- **h264** (por defecto) - Máxima compatibilidad
- **vp8** - WebM, código abierto
- **prores-422** - Edición profesional
- **h265** - Mejor compresión

## 🎯 Próximos Pasos

1. **Explorar ejemplos**
   - Mira `src/compositions/HelloWorld.tsx`
   - Mira `src/compositions/AnimatedText.tsx`

2. **Crear tu primer video**
   - Copia una composición de ejemplo
   - Modifica el contenido
   - Renderiza con `npm run render`

3. **Aprender animaciones**
   - Lee `ADVANCED.md`
   - Usa `interpolate()` y `spring()`
   - Experimenta con `useCurrentFrame()`

4. **Integrar media**
   - Añade imágenes con `<Img>`
   - Añade audio con `<Audio>`
   - Añade video con `<Video>`

## 🆘 Troubleshooting

### Problema: "FFmpeg not found"
```bash
npm install
node scripts/setup-ffmpeg.js
```

### Problema: "Cannot find module 'remotion'"
```bash
npm install
```

### Problema: "Port 3000 already in use"
```bash
npm start -- --port=3001
```

### Problema: "Out of memory"
```bash
# Reducir workers
npm run render -- --concurrency=1
```

## 📚 Recursos

- [Documentación Remotion](https://www.remotion.dev)
- [API Reference](https://www.remotion.dev/docs/api)
- [Ejemplos](https://www.remotion.dev/docs/examples)
- [FFmpeg Documentation](https://ffmpeg.org)

## 💡 Tips

1. **Desarrollo rápido**: Usa resoluciones bajas (720p) durante desarrollo
2. **Renderizado más rápido**: Aumenta `--concurrency`
3. **Mejor calidad**: Aumenta `--quality` o usa bitrate alto
4. **Animaciones smooth**: Siempre usa 30fps o superior
5. **Compatibilidad**: H.264 funciona en casi todos lados

## ✨ ¡Listo para crear!

Todo está configurado. ¡Ahora puedes crear videos programáticamente!

**Comienza con:**
```bash
npm start
```

¡Happy rendering! 🎉
