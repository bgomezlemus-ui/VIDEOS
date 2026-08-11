import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const HelloWorld: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = Math.min(1, (150 - frame) / 30);

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'Arial, sans-serif',
				opacity,
			}}
		>
			<div
				style={{
					fontSize: '80px',
					fontWeight: 'bold',
					color: 'white',
					textAlign: 'center',
					padding: '40px',
				}}
			>
				🎥 Remotion Video Editor
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '50px',
					fontSize: '24px',
					color: 'rgba(255, 255, 255, 0.8)',
				}}
			>
				Frame {frame} / 150
			</div>
		</AbsoluteFill>
	);
};
