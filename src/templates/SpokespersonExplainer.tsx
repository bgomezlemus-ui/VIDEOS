import React from 'react';
import {
	AbsoluteFill,
	OffthreadVideo,
	Sequence,
	staticFile,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';

// ═══════════════════════════════════════════════════════════════
//  PLANTILLA REUTILIZABLE: "Presentador + estadísticas animadas"
//  Se alimenta 100% de props (ver tipos abajo). Para un video nuevo
//  solo hay que crear un objeto de datos y registrarlo en Root.tsx.
// ═══════════════════════════════════════════════════════════════

export type StatType = 'counter' | 'ring' | 'bar';

export type StatSpec = {
	type: StatType;
	start: number; // frame de entrada
	end: number; // frame de salida
	kicker: string; // etiqueta superior (ej. "PARTICIPACIÓN")
	value: number; // valor final animado
	unit?: string; // "millones", "%+", etc.
	caption: string; // texto inferior
	accent?: 'gold' | 'teal' | 'red'; // color de acento
};

export type ExplainerData = {
	videoSrc: string; // nombre del archivo en public/
	brand: { line1: string; line2: string };
	category: string; // chip (ej. "ANÁLISIS ELECTORAL")
	topic: {
		kicker: string; // ej. "MÉXICO · ELECCIÓN JUDICIAL"
		titleTop: string; // ej. "El país eligió"
		titleBottom: string; // ej. "a sus"
		highlight: string; // palabra resaltada (ej. "jueces")
		subtitle: string; // dos líneas separadas por \n
	};
	stats: StatSpec[];
	outroFrom: number; // frame en el que arranca el cierre
	outroTagline: string;
	[key: string]: unknown; // compatibilidad con props de Remotion
};

// ─── Paleta y tipografía ──────────────────────────────────────
export const COLORS = {
	bgTop: '#0a0e27',
	bgBottom: '#161b3d',
	gold: '#ffd24a',
	teal: '#38bdf8',
	red: '#ff5964',
	white: '#ffffff',
	muted: '#9aa3c7',
	panelBorder: 'rgba(255,255,255,0.10)',
	panel: 'rgba(255,255,255,0.04)',
};
const FONT = "'Helvetica Neue', Arial, sans-serif";
const accentColor = (a?: 'gold' | 'teal' | 'red') =>
	a === 'red' ? COLORS.red : a === 'gold' ? COLORS.gold : COLORS.teal;

// Recorte de barras negras del video vertical 9:16 dentro de 1280x720
const CARD_H = 920;
const CARD_W = Math.round((CARD_H * 9) / 16);
const VIDEO_W = Math.round((1280 * CARD_H) / 720);

const formatNumber = (n: number) => Math.round(n).toLocaleString('es-MX');

// ─── Fondo ────────────────────────────────────────────────────
const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const glow = interpolate(Math.sin(frame / 40), [-1, 1], [0.25, 0.4]);
	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
			}}
		>
			<AbsoluteFill
				style={{
					background: `radial-gradient(circle at 50% 40%, rgba(56,189,248,${glow * 0.3}) 0%, transparent 55%)`,
				}}
			/>
			{[680, 1240].map((x) => (
				<div
					key={x}
					style={{
						position: 'absolute',
						left: x < 960 ? x : undefined,
						right: x >= 960 ? 1920 - x : undefined,
						top: 0,
						bottom: 0,
						width: 1,
						background:
							'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)',
					}}
				/>
			))}
		</AbsoluteFill>
	);
};

// ─── Tarjeta de video (personaje) ─────────────────────────────
const VideoCard: React.FC<{ src: string }> = ({ src }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spring({ frame, fps, config: { damping: 18 }, durationInFrames: 25 });
	const scale = interpolate(p, [0, 1], [0.9, 1]);
	return (
		<div
			style={{
				position: 'absolute',
				width: CARD_W,
				height: CARD_H,
				left: (1920 - CARD_W) / 2,
				top: (1080 - CARD_H) / 2,
				borderRadius: 28,
				overflow: 'hidden',
				boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.08)',
				transform: `scale(${scale})`,
			}}
		>
			<OffthreadVideo
				src={staticFile(src)}
				style={{
					position: 'absolute',
					width: VIDEO_W,
					height: CARD_H,
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>
			<AbsoluteFill style={{ boxShadow: 'inset 0 0 90px rgba(0,0,0,0.45)', borderRadius: 28 }} />
		</div>
	);
};

// ─── Panel de marca ───────────────────────────────────────────
const BrandPanel: React.FC<{ brand: ExplainerData['brand']; category: string }> = ({
	brand,
	category,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spring({ frame: frame - 8, fps, config: { damping: 18 }, durationInFrames: 25 });
	const x = interpolate(p, [0, 1], [-60, 0]);
	return (
		<div style={{ position: 'absolute', left: 70, top: 90, opacity: p, transform: `translateX(${x}px)` }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
				<div style={{ width: 10, height: 46, borderRadius: 4, background: COLORS.gold }} />
				<div>
					<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 30, fontWeight: 800, letterSpacing: 2 }}>
						{brand.line1}
					</div>
					<div style={{ fontFamily: FONT, color: COLORS.gold, fontSize: 22, fontWeight: 600, letterSpacing: 6 }}>
						{brand.line2}
					</div>
				</div>
			</div>
			<div
				style={{
					marginTop: 22,
					padding: '8px 16px',
					borderRadius: 999,
					border: `1px solid ${COLORS.panelBorder}`,
					background: COLORS.panel,
					display: 'inline-block',
					fontFamily: FONT,
					color: COLORS.muted,
					fontSize: 18,
					fontWeight: 600,
					letterSpacing: 1,
				}}
			>
				● {category}
			</div>
		</div>
	);
};

// ─── Título del tema ──────────────────────────────────────────
const TopicTitle: React.FC<{ topic: ExplainerData['topic'] }> = ({ topic }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spring({ frame: frame - 30, fps, config: { damping: 18 }, durationInFrames: 30 });
	const y = interpolate(p, [0, 1], [40, 0]);
	return (
		<div style={{ position: 'absolute', left: 70, bottom: 150, width: 560, opacity: p, transform: `translateY(${y}px)` }}>
			<div style={{ fontFamily: FONT, color: COLORS.teal, fontSize: 26, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>
				{topic.kicker}
			</div>
			<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 64, fontWeight: 900, lineHeight: 1.05 }}>
				{topic.titleTop}
				<br />
				{topic.titleBottom} <span style={{ color: COLORS.gold }}>{topic.highlight}</span>
			</div>
			<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 24, fontWeight: 500, marginTop: 16, lineHeight: 1.35 }}>
				{topic.subtitle.split('\n').map((l, i) => (
					<React.Fragment key={i}>
						{l}
						<br />
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

// ─── Contenedor de estadística ────────────────────────────────
const StatShell: React.FC<{ start: number; end: number; children: React.ReactNode }> = ({
	start,
	end,
	children,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const enter = spring({ frame: frame - start, fps, config: { damping: 18 }, durationInFrames: 20 });
	const exit = interpolate(frame, [end - 15, end], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	const y = interpolate(enter, [0, 1], [50, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				right: 70,
				top: '50%',
				width: 560,
				transform: `translateY(calc(-50% + ${y}px))`,
				opacity: enter * exit,
			}}
		>
			<div
				style={{
					background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
					border: `1px solid ${COLORS.panelBorder}`,
					borderRadius: 24,
					padding: '40px 44px',
				}}
			>
				{children}
			</div>
		</div>
	);
};

// ─── Renderizadores de estadística ────────────────────────────
const Stat: React.FC<{ spec: StatSpec }> = ({ spec }) => {
	const frame = useCurrentFrame();
	const acc = accentColor(spec.accent);
	const val = interpolate(frame, [spec.start + 8, spec.start + 60], [0, spec.value], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});

	if (spec.type === 'ring') {
		const r = 90;
		const circ = 2 * Math.PI * r;
		return (
			<StatShell start={spec.start} end={spec.end}>
				<div style={{ fontFamily: FONT, color: acc, fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>{spec.kicker}</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 18 }}>
					<svg width={210} height={210} viewBox="0 0 210 210">
						<circle cx={105} cy={105} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={18} />
						<circle
							cx={105}
							cy={105}
							r={r}
							fill="none"
							stroke={acc}
							strokeWidth={18}
							strokeLinecap="round"
							strokeDasharray={`${(val / 100) * circ} ${circ}`}
							transform="rotate(-90 105 105)"
						/>
						<text x={105} y={118} textAnchor="middle" fontFamily={FONT} fontSize={54} fontWeight={900} fill={COLORS.white}>
							{Math.round(val)}
							{spec.unit ?? '%'}
						</text>
					</svg>
					<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, lineHeight: 1.35, flex: 1 }}>
						{spec.caption}
					</div>
				</div>
			</StatShell>
		);
	}

	if (spec.type === 'bar') {
		return (
			<StatShell start={spec.start} end={spec.end}>
				<div style={{ fontFamily: FONT, color: acc, fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>{spec.kicker}</div>
				<div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
					<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 120, fontWeight: 900, lineHeight: 1 }}>
						{Math.round(val)}
					</div>
					<div style={{ fontFamily: FONT, color: acc, fontSize: 60, fontWeight: 900 }}>{spec.unit ?? '%'}</div>
				</div>
				<div style={{ marginTop: 18, height: 22, borderRadius: 12, background: 'rgba(255,255,255,0.10)', overflow: 'hidden' }}>
					<div style={{ width: `${val}%`, height: '100%', borderRadius: 12, background: `linear-gradient(90deg, ${acc}, #ff8a5c)` }} />
				</div>
				<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, marginTop: 16 }}>{spec.caption}</div>
			</StatShell>
		);
	}

	// counter
	return (
		<StatShell start={spec.start} end={spec.end}>
			<div style={{ fontFamily: FONT, color: acc, fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>{spec.kicker}</div>
			<div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6 }}>
				<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 120, fontWeight: 900, lineHeight: 1 }}>
					{formatNumber(val)}
				</div>
				{spec.unit && <div style={{ fontFamily: FONT, color: COLORS.gold, fontSize: 44, fontWeight: 800 }}>{spec.unit}</div>}
			</div>
			<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, marginTop: 10 }}>{spec.caption}</div>
		</StatShell>
	);
};

// ─── Barra de progreso ────────────────────────────────────────
const ProgressBar: React.FC = () => {
	const frame = useCurrentFrame();
	const { durationInFrames } = useVideoConfig();
	const w = interpolate(frame, [0, durationInFrames], [0, 100]);
	return (
		<div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 6, background: 'rgba(255,255,255,0.08)' }}>
			<div style={{ width: `${w}%`, height: '100%', background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.teal})` }} />
		</div>
	);
};

// ─── Cierre de marca ──────────────────────────────────────────
const Outro: React.FC<{ start: number; brand: ExplainerData['brand']; tagline: string }> = ({
	start,
	brand,
	tagline,
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spring({ frame: frame - start, fps, config: { damping: 20 }, durationInFrames: 25 });
	const scale = interpolate(p, [0, 1], [0.85, 1]);
	return (
		<AbsoluteFill
			style={{
				background: `linear-gradient(160deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)`,
				opacity: p,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div style={{ textAlign: 'center', transform: `scale(${scale})` }}>
				<div style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
					<div style={{ width: 14, height: 70, borderRadius: 6, background: COLORS.gold }} />
					<div style={{ textAlign: 'left' }}>
						<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 68, fontWeight: 900, letterSpacing: 2 }}>
							{brand.line1}
						</div>
						<div style={{ fontFamily: FONT, color: COLORS.gold, fontSize: 48, fontWeight: 700, letterSpacing: 12 }}>
							{brand.line2}
						</div>
					</div>
				</div>
				<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 30, fontWeight: 500, marginTop: 30 }}>{tagline}</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Composición de la plantilla ──────────────────────────────
export const SpokespersonExplainer: React.FC<ExplainerData> = (data) => {
	return (
		<AbsoluteFill>
			<Background />
			<VideoCard src={data.videoSrc} />
			<BrandPanel brand={data.brand} category={data.category} />
			<TopicTitle topic={data.topic} />
			{data.stats.map((s, i) => (
				<Stat key={i} spec={s} />
			))}
			<ProgressBar />
			<Sequence from={data.outroFrom}>
				<Outro start={data.outroFrom} brand={data.brand} tagline={data.outroTagline} />
			</Sequence>
		</AbsoluteFill>
	);
};
