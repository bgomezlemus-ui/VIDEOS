import React from 'react';
import { Composition } from 'remotion';
import { HelloWorld } from './compositions/HelloWorld';
import { AnimatedText } from './compositions/AnimatedText';

export const RemotionRoot: React.FC = () => {
	return (
		<>
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
