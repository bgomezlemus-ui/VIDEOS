import { BrowserSafeApis } from 'remotion';

export const renderVideo = async (
	compositionId: string,
	outputPath: string
): Promise<void> => {
	try {
		console.log(`Rendering ${compositionId} to ${outputPath}...`);
		// Placeholder para lógica de renderizado
		console.log('Rendering complete!');
	} catch (error) {
		console.error('Render error:', error);
		throw error;
	}
};

export const getVideoConfig = () => ({
	fps: 30,
	width: 1920,
	height: 1080,
	durationInFrames: 150,
	codec: 'h264',
	audioCodec: 'aac',
});
