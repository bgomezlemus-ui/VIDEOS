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

// ─────────────────────────────────────────────────────────────
// Paleta y constantes de diseño
// ─────────────────────────────────────────────────────────────
const COLORS = {
	bgTop: '#0a0e27',
	bgBottom: '#161b3d',
	gold: '#ffd24a',
	teal: '#38bdf8',
	red: '#ff5964',
	white: '#ffffff',
	muted: '#9aa3c7',
	panel: 'rgba(255,255,255,0.04)',
	panelBorder: 'rgba(255,255,255,0.10)',
};

const FONT = "'Helvetica Neue', Arial, sans-serif";

// Dimensiones para recortar las barras negras del video vertical original.
// Origen 1280x720 con contenido 9:16 (~405px) centrado.
const CARD_H = 920;
const CARD_W = Math.round((CARD_H * 9) / 16); // 518
const VIDEO_W = Math.round((1280 * CARD_H) / 720); // 1636
const VIDEO_H = CARD_H;

// ─────────────────────────────────────────────────────────────
// Helpers de animación
// ─────────────────────────────────────────────────────────────
const useEntrance = (start: number, duration = 20) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const local = frame - start;
	const progress = spring({
		frame: local,
		fps,
		config: { damping: 18, mass: 0.9 },
		durationInFrames: duration,
	});
	return { local, progress };
};

const formatNumber = (n: number) =>
	Math.round(n).toLocaleString('es-MX');

// ─────────────────────────────────────────────────────────────
// Fondo con degradado + resplandor sutil
// ─────────────────────────────────────────────────────────────
const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const glow = interpolate(
		Math.sin(frame / 40),
		[-1, 1],
		[0.25, 0.4]
	);
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
			{/* Líneas decorativas verticales */}
			<div
				style={{
					position: 'absolute',
					left: 680,
					top: 0,
					bottom: 0,
					width: 1,
					background:
						'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					right: 680,
					top: 0,
					bottom: 0,
					width: 1,
					background:
						'linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)',
				}}
			/>
		</AbsoluteFill>
	);
};

// ─────────────────────────────────────────────────────────────
// Tarjeta central: video original recortado (sin barras negras)
// ─────────────────────────────────────────────────────────────
const VideoCard: React.FC = () => {
	const { progress } = useEntrance(0, 25);
	const scale = interpolate(progress, [0, 1], [0.9, 1]);
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
				boxShadow:
					'0 30px 80px rgba(0,0,0,0.55), 0 0 0 2px rgba(255,255,255,0.08)',
				transform: `scale(${scale})`,
			}}
		>
			<OffthreadVideo
				src={staticFile('source.mp4')}
				style={{
					position: 'absolute',
					width: VIDEO_W,
					height: VIDEO_H,
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>
			{/* Viñeta sutil dentro de la tarjeta */}
			<AbsoluteFill
				style={{
					boxShadow: 'inset 0 0 90px rgba(0,0,0,0.45)',
					borderRadius: 28,
				}}
			/>
		</div>
	);
};

// ─────────────────────────────────────────────────────────────
// Barra de marca (izquierda superior) — persistente
// ─────────────────────────────────────────────────────────────
const BrandPanel: React.FC = () => {
	const { progress } = useEntrance(8, 25);
	const x = interpolate(progress, [0, 1], [-60, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				left: 70,
				top: 90,
				opacity: progress,
				transform: `translateX(${x}px)`,
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 14,
				}}
			>
				<div
					style={{
						width: 10,
						height: 46,
						borderRadius: 4,
						background: COLORS.gold,
					}}
				/>
				<div>
					<div
						style={{
							fontFamily: FONT,
							color: COLORS.white,
							fontSize: 30,
							fontWeight: 800,
							letterSpacing: 2,
						}}
					>
						CRITERIO
					</div>
					<div
						style={{
							fontFamily: FONT,
							color: COLORS.gold,
							fontSize: 22,
							fontWeight: 600,
							letterSpacing: 6,
						}}
					>
						ELECTORAL
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
				● ANÁLISIS ELECTORAL
			</div>
		</div>
	);
};

// ─────────────────────────────────────────────────────────────
// Título del tema (izquierda) — persistente tras la intro
// ─────────────────────────────────────────────────────────────
const TopicTitle: React.FC = () => {
	const { progress } = useEntrance(30, 30);
	const y = interpolate(progress, [0, 1], [40, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				left: 70,
				bottom: 150,
				width: 560,
				opacity: progress,
				transform: `translateY(${y}px)`,
			}}
		>
			<div
				style={{
					fontFamily: FONT,
					color: COLORS.teal,
					fontSize: 26,
					fontWeight: 700,
					letterSpacing: 3,
					marginBottom: 10,
				}}
			>
				MÉXICO · ELECCIÓN JUDICIAL
			</div>
			<div
				style={{
					fontFamily: FONT,
					color: COLORS.white,
					fontSize: 64,
					fontWeight: 900,
					lineHeight: 1.05,
				}}
			>
				El país eligió
				<br />
				a sus{' '}
				<span style={{ color: COLORS.gold }}>jueces</span>
			</div>
			<div
				style={{
					fontFamily: FONT,
					color: COLORS.muted,
					fontSize: 24,
					fontWeight: 500,
					marginTop: 16,
					lineHeight: 1.35,
				}}
			>
				Por primera vez por voto popular.
				<br />
				Estos son los números que dejó.
			</div>
		</div>
	);
};

// ─────────────────────────────────────────────────────────────
// Contenedor de tarjeta de estadística (panel derecho)
// ─────────────────────────────────────────────────────────────
const StatShell: React.FC<{
	start: number;
	end: number;
	children: React.ReactNode;
}> = ({ start, end, children }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const enter = spring({
		frame: frame - start,
		fps,
		config: { damping: 18, mass: 0.9 },
		durationInFrames: 20,
	});
	const exit = interpolate(frame, [end - 15, end], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const opacity = enter * exit;
	const y = interpolate(enter, [0, 1], [50, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				right: 70,
				top: '50%',
				width: 560,
				transform: `translateY(calc(-50% + ${y}px))`,
				opacity,
			}}
		>
			<div
				style={{
					background:
						'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
					border: `1px solid ${COLORS.panelBorder}`,
					borderRadius: 24,
					padding: '40px 44px',
					backdropFilter: 'blur(4px)',
				}}
			>
				{children}
			</div>
		</div>
	);
};

// Contador animado
const CounterStat: React.FC<{ start: number; end: number }> = ({
	start,
	end,
}) => {
	const frame = useCurrentFrame();
	const value = interpolate(
		frame,
		[start + 8, start + 70],
		[0, 12],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
	);
	return (
		<StatShell start={start} end={end}>
			<div style={{ fontFamily: FONT, color: COLORS.teal, fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
				PARTICIPACIÓN
			</div>
			<div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 6 }}>
				<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 120, fontWeight: 900, lineHeight: 1 }}>
					{formatNumber(value)}
				</div>
				<div style={{ fontFamily: FONT, color: COLORS.gold, fontSize: 44, fontWeight: 800 }}>
					millones
				</div>
			</div>
			<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, marginTop: 10 }}>
				de personas acudieron a votar
			</div>
		</StatShell>
	);
};

// Anillo de porcentaje animado
const RingStat: React.FC<{ start: number; end: number }> = ({ start, end }) => {
	const frame = useCurrentFrame();
	const pct = interpolate(frame, [start + 8, start + 60], [0, 13], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const r = 90;
	const circ = 2 * Math.PI * r;
	const dash = (pct / 100) * circ;
	return (
		<StatShell start={start} end={end}>
			<div style={{ fontFamily: FONT, color: COLORS.teal, fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
				DE LA LISTA NOMINAL
			</div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 18 }}>
				<svg width={210} height={210} viewBox="0 0 210 210">
					<circle cx={105} cy={105} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={18} />
					<circle
						cx={105}
						cy={105}
						r={r}
						fill="none"
						stroke={COLORS.teal}
						strokeWidth={18}
						strokeLinecap="round"
						strokeDasharray={`${dash} ${circ}`}
						transform="rotate(-90 105 105)"
					/>
					<text x={105} y={118} textAnchor="middle" fontFamily={FONT} fontSize={54} fontWeight={900} fill={COLORS.white}>
						{Math.round(pct)}%
					</text>
				</svg>
				<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, lineHeight: 1.35, flex: 1 }}>
					Solo <span style={{ color: COLORS.white, fontWeight: 800 }}>1 de cada 8</span> ciudadanos participó
				</div>
			</div>
		</StatShell>
	);
};

// Barra de abstención animada
const BarStat: React.FC<{ start: number; end: number }> = ({ start, end }) => {
	const frame = useCurrentFrame();
	const pct = interpolate(frame, [start + 8, start + 55], [0, 86], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	return (
		<StatShell start={start} end={end}>
			<div style={{ fontFamily: FONT, color: COLORS.red, fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>
				ABSTENCIÓN HISTÓRICA
			</div>
			<div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
				<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 120, fontWeight: 900, lineHeight: 1 }}>
					{Math.round(pct)}
				</div>
				<div style={{ fontFamily: FONT, color: COLORS.red, fontSize: 60, fontWeight: 900 }}>%+</div>
			</div>
			<div style={{ marginTop: 18, height: 22, borderRadius: 12, background: 'rgba(255,255,255,0.10)', overflow: 'hidden' }}>
				<div
					style={{
						width: `${pct}%`,
						height: '100%',
						borderRadius: 12,
						background: `linear-gradient(90deg, ${COLORS.red}, #ff8a5c)`,
					}}
				/>
			</div>
			<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, marginTop: 16 }}>
				no acudió a las urnas
			</div>
		</StatShell>
	);
};

// ─────────────────────────────────────────────────────────────
// Barra de progreso inferior
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
// Tarjeta final de marca
// ─────────────────────────────────────────────────────────────
const Outro: React.FC<{ start: number }> = ({ start }) => {
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
				<div
					style={{
						display: 'inline-flex',
						alignItems: 'center',
						gap: 18,
						justifyContent: 'center',
					}}
				>
					<div style={{ width: 14, height: 70, borderRadius: 6, background: COLORS.gold }} />
					<div style={{ textAlign: 'left' }}>
						<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 68, fontWeight: 900, letterSpacing: 2 }}>
							CRITERIO
						</div>
						<div style={{ fontFamily: FONT, color: COLORS.gold, fontSize: 48, fontWeight: 700, letterSpacing: 12 }}>
							ELECTORAL
						</div>
					</div>
				</div>
				<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 30, fontWeight: 500, marginTop: 30 }}>
					Los datos que definen la democracia
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─────────────────────────────────────────────────────────────
// Composición principal
// ─────────────────────────────────────────────────────────────
export const JudicialElection: React.FC = () => {
	return (
		<AbsoluteFill>
			<Background />
			<VideoCard />
			<BrandPanel />
			<TopicTitle />

			{/* Estadísticas sincronizadas con el discurso */}
			<CounterStat start={80} end={215} />
			<RingStat start={220} end={350} />
			<BarStat start={360} end={490} />

			<ProgressBar />

			{/* Cierre de marca */}
			<Sequence from={498}>
				<Outro start={498} />
			</Sequence>
		</AbsoluteFill>
	);
};
