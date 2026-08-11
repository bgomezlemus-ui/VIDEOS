import type { ExplainerData } from '../templates/SpokespersonExplainer';

// Datos del video sobre la elección judicial.
// Para un video NUEVO: copia este archivo, cambia los valores y regístralo en Root.tsx.
export const eleccionJudicial: ExplainerData = {
	videoSrc: 'source.mp4', // archivo del personaje en public/
	brand: { line1: 'CRITERIO', line2: 'ELECTORAL' },
	category: 'ANÁLISIS ELECTORAL',
	topic: {
		kicker: 'MÉXICO · ELECCIÓN JUDICIAL',
		titleTop: 'El país eligió',
		titleBottom: 'a sus',
		highlight: 'jueces',
		subtitle: 'Por primera vez por voto popular.\nEstos son los números que dejó.',
	},
	stats: [
		{
			type: 'counter',
			start: 80,
			end: 215,
			kicker: 'PARTICIPACIÓN',
			value: 12,
			unit: 'millones',
			caption: 'de personas acudieron a votar',
			accent: 'teal',
		},
		{
			type: 'ring',
			start: 220,
			end: 350,
			kicker: 'DE LA LISTA NOMINAL',
			value: 13,
			unit: '%',
			caption: 'Solo 1 de cada 8 ciudadanos participó',
			accent: 'teal',
		},
		{
			type: 'bar',
			start: 360,
			end: 490,
			kicker: 'ABSTENCIÓN HISTÓRICA',
			value: 86,
			unit: '%+',
			caption: 'no acudió a las urnas',
			accent: 'red',
		},
	],
	outroFrom: 498,
	outroTagline: 'Los datos que definen la democracia',
};

export const eleccionJudicialDuration = 554; // frames (18.47s @ 30fps)
