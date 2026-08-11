# 🎭 Perfil de Estilo Guardado — "Criterio Electoral"

Este archivo guarda el **personaje**, la **voz** y el **estilo de edición** para
reutilizarlos en futuros videos. Tú aportas el argumento/guion; yo aplico este
perfil.

---

## 1. 🧑‍💼 Personaje (referencia visual)

- **Descripción:** hombre joven, barba corta, traje azul marino sobre camiseta
  blanca, frente a una estantería de libros (estilo "experto / analista").
- **Formato del clip original:** vertical 9:16 dentro de 1280×720 (barras negras
  a los lados, que la plantilla recorta automáticamente).
- **Referencia guardada:** `assets/character/personaje-referencia.jpg`
- **Origen:** avatar de IA (marca de agua "descript" en el clip original).

> ✅ **Flujo acordado:** TÚ generas el clip del avatar hablando tu guion (en
> Descript o donde creaste el original) y me lo pasas. YO aplico toda la
> edición automáticamente. La referencia visual se guarda solo para consistencia.

## 2. 🎙️ Voz

- **Idioma:** español (México).
- **Tono:** informativo, pausado, tipo presentador de noticias/análisis.
- **Muestra de referencia para clonado:** `assets/character/voz-referencia.wav`
  (~18 s, mono 44.1 kHz).

## 3. 🎨 Estilo de edición (plantilla `SpokespersonExplainer`)

Estos elementos se aplican automáticamente:

| Elemento | Detalle |
|---|---|
| **Formato salida** | 1920×1080, 30 fps, H.264 + AAC |
| **Fondo** | Degradado azul marino `#0a0e27 → #161b3d` + resplandor sutil |
| **Video** | Centrado en tarjeta con bordes redondeados y sombra (barras negras recortadas) |
| **Panel de marca** | Arriba-izq: "CRITERIO / ELECTORAL" + chip de categoría |
| **Título del tema** | Abajo-izq, con palabra resaltada en dorado |
| **Estadísticas** | Panel derecho: tarjetas animadas (`counter`, `ring`, `bar`) |
| **Acentos** | Dorado `#ffd24a`, azul `#38bdf8`, rojo `#ff5964` |
| **Extras** | Barra de progreso inferior + tarjeta de cierre de marca |
| **Audio/subtítulos** | Se conservan los del clip original |

### Tipos de gráfico disponibles
- `counter` → número que sube (ej. "12 millones")
- `ring` → anillo de porcentaje (ej. "13%")
- `bar` → barra de porcentaje (ej. "86%+")

## 4. 🔄 Flujo para un video nuevo (acordado)

```
 [TÚ]  Generas el clip del avatar hablando tu guion
       + me pasas el .mp4 y me dices los datos clave / argumento
        │
        ▼
 [YO]  Copio el clip a public/  →  creo el archivo de datos en
       src/videos/  →  registro la <Composition> en Root.tsx
        │
        ▼
 [YO]  Renderizo con Remotion (aplica este estilo automáticamente)
        │
        ▼
     Video final en out/  →  te lo entrego para previsualizar
```

### Qué necesito de ti cada vez
1. **El clip** del avatar hablando (arrástralo al chat).
2. **Los datos/estadísticas** a resaltar (o me dices "sácalos de los subtítulos"
   y los leo yo del propio clip).
3. (Opcional) Ajustes de textos: título del tema, marca, frase de cierre.

Con eso, todo lo demás (recorte, fondo, marca, gráficos animados, cierre,
render) es automático.

## 5. 📄 Plantilla de datos (copiar y rellenar)

Ver ejemplo real en `src/videos/eleccion-judicial.ts`. Estructura:

```typescript
export const miVideo: ExplainerData = {
  videoSrc: 'mi-clip.mp4',
  brand: { line1: 'CRITERIO', line2: 'ELECTORAL' },
  category: 'ANÁLISIS ELECTORAL',
  topic: {
    kicker: 'TEMA · SUBTEMA',
    titleTop: 'Primera línea',
    titleBottom: 'segunda línea',
    highlight: 'palabra-clave',
    subtitle: 'Línea 1\nLínea 2',
  },
  stats: [
    { type: 'counter', start: 80,  end: 215, kicker: 'ETIQUETA', value: 12, unit: 'millones', caption: '...', accent: 'teal' },
    { type: 'ring',    start: 220, end: 350, kicker: 'ETIQUETA', value: 13, unit: '%',        caption: '...', accent: 'teal' },
    { type: 'bar',     start: 360, end: 490, kicker: 'ETIQUETA', value: 86, unit: '%+',       caption: '...', accent: 'red'  },
  ],
  outroFrom: 498,
  outroTagline: 'Frase de cierre',
};
```

Los tiempos (`start`/`end`) se ajustan a lo que dice el presentador en cada momento.
