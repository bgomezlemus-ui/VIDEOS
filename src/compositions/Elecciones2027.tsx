import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Img,
	staticFile,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Easing,
} from 'remotion';
import { COLORS } from '../templates/SpokespersonExplainer';

// ═══════════════════════════════════════════════════════════════
//  VIDEO: "Elecciones 2027 — Ya empieza" (estilo Criterio Electoral)
//  Imagen fija del personaje (con zoom lento) + tipografía y
//  gráficos animados según el guion cronometrado.
//  Total: 18 s @ 30 fps = 540 frames.
// ═══════════════════════════════════════════════════════════════

const FONT = "'Helvetica Neue', Arial, sans-serif";

const CARD_H = 940;
const CARD_W = Math.round((CARD_H * 2) / 3); // retrato 2:3

// Ventana de aparición/desaparición para un bloque
const useWindow = (start: number, end: number, io = 12) => {
	const frame = useCurrentFrame();
	const appear = interpolate(frame, [start, start + io], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const disappear = interpolate(frame, [end - io, end], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return appear * disappear;
};

// ─── Fondo ────────────────────────────────────────────────────
const Background: React.FC = () => {
	const frame = useCurrentFrame();
	const glow = interpolate(Math.sin(frame / 40), [-1, 1], [0.25, 0.4]);
	return (
		<AbsoluteFill style={{ background: `linear-gradient(160deg, ${COLORS.bgTop} 0%, ${COLORS.bgBottom} 100%)` }}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(circle at 50% 40%, rgba(56,189,248,${glow * 0.3}) 0%, transparent 55%)`,
				}}
			/>
		</AbsoluteFill>
	);
};

// ─── Personaje (imagen fija con zoom lento) ───────────────────
const CharacterCard: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();
	const p = spring({ frame, fps, config: { damping: 18 }, durationInFrames: 25 });
	const enterScale = interpolate(p, [0, 1], [0.92, 1]);
	const ken = interpolate(frame, [0, durationInFrames], [1, 1.09]);
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
				transform: `scale(${enterScale})`,
			}}
		>
			<Img
				src={staticFile('character.jpg')}
				style={{
					position: 'absolute',
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					objectPosition: 'center top',
					transform: `scale(${ken})`,
				}}
			/>
			<AbsoluteFill style={{ boxShadow: 'inset 0 0 120px rgba(0,0,0,0.5)', borderRadius: 28 }} />
			{/* Degradado inferior para asentar el texto */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: 260,
					background: 'linear-gradient(0deg, rgba(10,14,39,0.85), transparent)',
				}}
			/>
		</div>
	);
};

// ─── Marca (persistente) ──────────────────────────────────────
const BrandPanel: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spring({ frame: frame - 6, fps, config: { damping: 18 }, durationInFrames: 25 });
	const x = interpolate(p, [0, 1], [-60, 0]);
	return (
		<div style={{ position: 'absolute', left: 70, top: 84, opacity: p, transform: `translateX(${x}px)` }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
				<div style={{ width: 10, height: 46, borderRadius: 4, background: COLORS.gold }} />
				<div>
					<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 30, fontWeight: 800, letterSpacing: 2 }}>CRITERIO</div>
					<div style={{ fontFamily: FONT, color: COLORS.gold, fontSize: 22, fontWeight: 600, letterSpacing: 6 }}>ELECTORAL</div>
				</div>
			</div>
			<div
				style={{
					marginTop: 20,
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
				● ELECCIONES 2027
			</div>
		</div>
	);
};

// ─── Etiqueta "cuenta regresiva" tipo píldora (izquierda) ─────
const Pill: React.FC<{ text: string; start: number; end: number; color: string }> = ({ text, start, end, color }) => {
	const o = useWindow(start, end);
	const frame = useCurrentFrame();
	const y = interpolate(frame, [start, start + 12], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	return (
		<div
			style={{
				position: 'absolute',
				left: 70,
				top: 250,
				opacity: o,
				transform: `translateY(${y}px)`,
				padding: '12px 22px',
				borderRadius: 999,
				background: color,
				fontFamily: FONT,
				color: '#0a0e27',
				fontSize: 26,
				fontWeight: 900,
				letterSpacing: 2,
			}}
		>
			{text}
		</div>
	);
};

// ─── Titular grande inferior (izquierda) ──────────────────────
const Headline: React.FC<{
	start: number;
	end: number;
	kicker?: string;
	title: string;
	sub?: string;
	accent?: string;
}> = ({ start, end, kicker, title, sub, accent = COLORS.gold }) => {
	const o = useWindow(start, end);
	const frame = useCurrentFrame();
	const y = interpolate(frame, [start, start + 14], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
	return (
		<div style={{ position: 'absolute', left: 70, bottom: 150, width: 640, opacity: o, transform: `translateY(${y}px)` }}>
			{kicker && (
				<div style={{ fontFamily: FONT, color: COLORS.teal, fontSize: 26, fontWeight: 700, letterSpacing: 3, marginBottom: 10 }}>
					{kicker}
				</div>
			)}
			<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 82, fontWeight: 900, lineHeight: 1.02 }}>
				{title.split('|').map((part, i) => (
					<span key={i} style={{ color: i % 2 === 1 ? accent : COLORS.white }}>
						{part}
					</span>
				))}
			</div>
			{sub && (
				<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 28, fontWeight: 500, marginTop: 14 }}>{sub}</div>
			)}
		</div>
	);
};

// ─── Chip de cifra animada (panel derecho) ────────────────────
const CountChip: React.FC<{
	start: number;
	end: number;
	value: number;
	prefix?: string;
	label: string;
	row: number;
	accent: string;
}> = ({ start, end, value, prefix = '', label, row, accent }) => {
	const frame = useCurrentFrame();
	const localStart = start;
	const o = useWindow(localStart, end);
	const enter = spring({
		frame: frame - localStart,
		fps: 30,
		config: { damping: 16 },
		durationInFrames: 18,
	});
	const val = interpolate(frame, [localStart + 4, localStart + 40], [0, value], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	const x = interpolate(enter, [0, 1], [60, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				right: 70,
				top: 300 + row * 172,
				width: 520,
				opacity: o,
				transform: `translateX(${x}px)`,
				display: 'flex',
				alignItems: 'center',
				gap: 24,
				background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
				border: `1px solid ${COLORS.panelBorder}`,
				borderRadius: 22,
				padding: '26px 32px',
			}}
		>
			<div style={{ fontFamily: FONT, color: accent, fontSize: 84, fontWeight: 900, lineHeight: 1, minWidth: 180, textAlign: 'right' }}>
				{prefix}
				{Math.round(val).toLocaleString('es-MX')}
			</div>
			<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 30, fontWeight: 600, lineHeight: 1.2 }}>{label}</div>
		</div>
	);
};

// ─── Nota lateral simple (derecha) ────────────────────────────
const SideNote: React.FC<{ start: number; end: number; title: string; sub: string; accent: string }> = ({
	start,
	end,
	title,
	sub,
	accent,
}) => {
	const frame = useCurrentFrame();
	const o = useWindow(start, end);
	const enter = spring({ frame: frame - start, fps: 30, config: { damping: 16 }, durationInFrames: 18 });
	const x = interpolate(enter, [0, 1], [60, 0]);
	return (
		<div
			style={{
				position: 'absolute',
				right: 70,
				top: '50%',
				width: 520,
				opacity: o,
				transform: `translate(${x}px, -50%)`,
				background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
				border: `1px solid ${COLORS.panelBorder}`,
				borderRadius: 22,
				padding: '36px 40px',
			}}
		>
			<div style={{ fontFamily: FONT, color: accent, fontSize: 30, fontWeight: 900, letterSpacing: 1 }}>{title}</div>
			<div style={{ fontFamily: FONT, color: COLORS.muted, fontSize: 26, fontWeight: 500, marginTop: 10, lineHeight: 1.3 }}>{sub}</div>
		</div>
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

// ─── Cierre "Guarda la fecha" ─────────────────────────────────
const Outro: React.FC<{ start: number }> = ({ start }) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const p = spring({ frame: frame - start, fps, config: { damping: 20 }, durationInFrames: 22 });
	const scale = interpolate(p, [0, 1], [0.85, 1]);
	return (
		<AbsoluteFill style={{ opacity: p, alignItems: 'center', justifyContent: 'center' }}>
			<div
				style={{
					textAlign: 'center',
					transform: `scale(${scale})`,
					background: 'rgba(10,14,39,0.66)',
					borderRadius: 28,
					padding: '48px 70px',
					border: `1px solid ${COLORS.panelBorder}`,
				}}
			>
				<div style={{ fontFamily: FONT, color: COLORS.teal, fontSize: 30, fontWeight: 700, letterSpacing: 3 }}>6 DE JUNIO DE 2027</div>
				<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 96, fontWeight: 900, marginTop: 8 }}>
					<span style={{ color: COLORS.gold }}>+1,000</span> CARGOS
				</div>
				<div style={{ fontFamily: FONT, color: COLORS.white, fontSize: 40, fontWeight: 700, marginTop: 18, letterSpacing: 4 }}>
					🗓️ GUARDA LA FECHA
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ═══════════════════════════════════════════════════════════════
export const Elecciones2027: React.FC = () => {
	return (
		<AbsoluteFill>
			{/* Locución sincronizada (voz IA local — espeak-ng, español) */}
			<Audio src={staticFile('narration.wav')} />

			<Background />
			<CharacterCard />
			<BrandPanel />

			{/* Beat 1 · "Arranca la elección más grande desde 2024." (frames 9–128) */}
			<Pill text="⚡ YA EMPIEZA" start={9} end={132} color={COLORS.gold} />
			<Headline start={14} end={128} title="La elección más|grande" sub="desde 2024" accent={COLORS.gold} />

			{/* Beat 2 · "El 10 de septiembre, pero no se vota ese día." (frames 138–246) */}
			<Pill text="🗓️ 10 DE SEPTIEMBRE" start={138} end={250} color={COLORS.teal} />
			<Headline start={142} end={246} kicker="ARRANCA EL PROCESO" title="10 de|septiembre" accent={COLORS.teal} />
			<SideNote start={168} end={246} title="…pero no se vota ese día" sub="Es solo el inicio del proceso electoral" accent={COLORS.teal} />

			{/* Beat 3 · "El 6 de junio de 2027 se renuevan 500 diputaciones, 17 gubernaturas, congresos locales…" (frames 256–559) */}
			<Pill text="🗳️ 6 JUNIO 2027" start={256} end={562} color={COLORS.gold} />
			<Headline start={260} end={559} kicker="SE RENUEVAN" title="Cargos en|todo el país" accent={COLORS.gold} />
			<CountChip start={360} end={562} value={500} label="Diputaciones federales" row={0} accent={COLORS.teal} />
			<CountChip start={420} end={562} value={17} label="Gubernaturas" row={1} accent={COLORS.gold} />
			<CountChip start={470} end={562} value={32} label="Congresos locales" row={2} accent={COLORS.teal} />

			{/* Beat 4 · "Son más de mil cargos en total. Guarda la fecha." (frames 570–690) */}
			<Outro start={570} />

			<ProgressBar />
		</AbsoluteFill>
	);
};
