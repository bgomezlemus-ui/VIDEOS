import React from 'react';
import {
	AbsoluteFill,
	useCurrentFrame,
	interpolate,
	spring,
	useVideoConfig,
} from 'remotion';

export const AnimatedText: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Animación de escala con spring
	const scale = spring({
		frame,
		fps,
		config: {
			damping: 8,
		},
	});

	// Interpolación de opacidad
	const opacity = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// Rotación
	const rotation = interpolate(frame, [0, 120], [0, 360]);

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'white',
			}}
		>
			<div
				style={{
					fontSize: '72px',
					fontWeight: 'bold',
					opacity,
					transform: `scale(${scale})`,
				}}
			>
				✨ Animated Text
			</div>
			<div
				style={{
					width: '200px',
					height: '200px',
					background: 'rgba(255, 255, 255, 0.3)',
					borderRadius: '50%',
					marginTop: '40px',
					transform: `rotate(${rotation}deg)`,
				}}
			/>
		</AbsoluteFill>
	);
};
