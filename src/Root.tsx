import React from 'react';
import { Composition } from 'remotion';
import { HelloWorld } from './compositions/HelloWorld';
import { AnimatedText } from './compositions/AnimatedText';
import { JudicialElection } from './compositions/JudicialElection';
import { SpokespersonExplainer } from './templates/SpokespersonExplainer';
import { eleccionJudicial, eleccionJudicialDuration } from './videos/eleccion-judicial';
import { Elecciones2027 } from './compositions/Elecciones2027';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Elecciones2027"
				component={Elecciones2027}
				durationInFrames={708}
				fps={30}
				width={1920}
				height={1080}
			/>
			{/* Plantilla reutilizable alimentada por datos.
			    Nuevo video = nuevo archivo de datos + nueva <Composition>. */}
			<Composition
				id="Explainer-EleccionJudicial"
				component={SpokespersonExplainer}
				durationInFrames={eleccionJudicialDuration}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={eleccionJudicial}
			/>
			<Composition
				id="JudicialElection"
				component={JudicialElection}
				durationInFrames={554}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="AnimatedText"
				component={AnimatedText}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
