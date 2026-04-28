import React, { useEffect, useState } from "react";
import gatitosImg from "./assets/cats-hugging.png";


interface CartaCincoMesesProps {
  nombreElla?: string;
  mensaje?: string;
  fecha?: string;
  imagenGatitos?: string;
}

interface Pieza {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  type: "heart" | "petal" | "spark";
}

const CartaCincoMeses: React.FC<CartaCincoMesesProps> = ({
  nombreElla = "Mi amor",
  mensaje = `Cinco meses parecen poco cuando los cuento, y un mundo entero cuando los siento.

Gracias por las risas, tu compañía y por hacer que cada día tibio se sienta como un pedacito de hogar.

Te amo, hoy y todos los meses que vienen.`,
  fecha = "5 meses · contigo",
  imagenGatitos = gatitosImg,
}) => {
  const [piezas, setPiezas] = useState<Pieza[]>([]);
  const [revelar, setRevelar] = useState(false);

  useEffect(() => {
    const generadas: Pieza[] = Array.from({ length: 28 }).map((_, i) => {
      const types: Pieza["type"][] = ["heart", "petal", "spark"];
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 10,
        size: 10 + Math.random() * 18,
        rotation: Math.random() * 360,
        type: types[i % 3],
      };
    });
    setPiezas(generadas);
    const t = setTimeout(() => setRevelar(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="carta-root">
      <style>{cssStyles}</style>

      <div className="bg-fixed">
        <div className="bg-gradient" />
        <div className="bg-noise" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
      </div>

      <div className="floating-layer" aria-hidden>
        {piezas.map((p) => (
          <span
            key={p.id}
            className={`piece piece-${p.type}`}
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {p.type === "heart" && <HeartIcon />}
            {p.type === "petal" && <PetalIcon />}
            {p.type === "spark" && <SparkIcon />}
          </span>
        ))}
      </div>

      <article className={`letter ${revelar ? "is-open" : ""}`}>
        <div className="letter-edge" />
        <header className="letter-head">
          <div className="ornament">
            <OrnamentIcon />
          </div>
          <p className="eyebrow">{fecha}</p>
          <h1 className="title">
            <span className="title-cinco">cinco</span>
            <span className="title-meses">meses contigo</span>
          </h1>
          <p className="dedication">para {nombreElla},</p>
        </header>

        <div className="cats-wrap">
          <div className="cats-img-frame">
            <img
              src={imagenGatitos}
              alt="Dos gatitos abrazados durmiendo juntos"
              className="cats-img"
              loading="lazy"
            />
          </div>
        </div>

        <section className="letter-body">
          {mensaje.split(/\n\s*\n/).map((parrafo, i) => (
            <p key={i} className="msg-line" style={{ animationDelay: `${0.6 + i * 0.15}s` }}>
              {parrafo.trim().replace(/\s+/g, " ")}
            </p>
          ))}
        </section>

        <footer className="letter-foot">
          <div className="signature">
            <span className="signature-line" />
            <span className="signature-text">Tuyo, siempre</span>
            <span className="signature-line" />
          </div>
          <div className="counter">
            <Pill label="mes 1" />
            <Pill label="mes 2" />
            <Pill label="mes 3" />
            <Pill label="mes 4" />
            <Pill label="mes 5" highlight />
          </div>
        </footer>
      </article>
    </div>
  );
};

/* -------------------------- subcomponentes -------------------------- */

const Pill: React.FC<{ label: string; highlight?: boolean }> = ({ label, highlight }) => (
  <span className={`pill ${highlight ? "pill-on" : ""}`}>{label}</span>
);

const OrnamentIcon: React.FC = () => (
  <svg viewBox="0 0 120 24" width="120" height="24" aria-hidden>
    <path
      d="M2 12 C 18 4, 30 20, 46 12 M 60 12 m -5 0 a 5 5 0 1 0 10 0 a 5 5 0 1 0 -10 0 M 74 12 C 90 4, 102 20, 118 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" aria-hidden>
    <path
      d="M16 27s-11-6.7-11-15.2C5 7.5 8.5 4.5 12.5 4.5c2.2 0 3.7 1.1 4.5 2.5.8-1.4 2.3-2.5 4.5-2.5 4 0 7.5 3 7.5 7.3C29 20.3 16 27 16 27z"
      fill="#7a1f33"
      opacity="0.85"
    />
  </svg>
);

const PetalIcon: React.FC = () => (
  <svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden>
    <path
      d="M20 4 C 30 10, 34 22, 24 34 C 18 38, 10 32, 8 24 C 6 14, 12 6, 20 4 Z"
      fill="#c98091"
      opacity="0.7"
    />
  </svg>
);

const SparkIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden>
    <path
      d="M12 2 C 13 9, 15 11, 22 12 C 15 13, 13 15, 12 22 C 11 15, 9 13, 2 12 C 9 11, 11 9, 12 2 Z"
      fill="#f3d9b1"
      opacity="0.85"
    />
  </svg>
);

/* ------------------------------ estilos ------------------------------ */

const cssStyles = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Dancing+Script:wght@500;700&family=Cormorant+Upright:wght@400;500&display=swap');

html, body, #root {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;         
  min-height: 100dvh;  
  background: #2a0710;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
}
* { box-sizing: border-box; }

.carta-root {
  --burgundy-deep: #4a0e1f;
  --burgundy: #6b1e2c;
  --burgundy-mid: #8b2942;
  --burgundy-soft: #a63d5b;
  --blush: #e8b4bc;
  --cream: #faf3e7;
  --cream-warm: #f3e4cc;
  --ink: #2a0a14;
  --paper: #fbf4e6;

  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  min-height: 100dvh;
  font-family: 'Cormorant Garamond', serif;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;

  padding:
    calc(40px + env(safe-area-inset-top, 0px))
    calc(20px + env(safe-area-inset-right, 0px))
    calc(40px + env(safe-area-inset-bottom, 0px))
    calc(20px + env(safe-area-inset-left, 0px));
  isolation: isolate;
}

.bg-fixed {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.bg-gradient {
  position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 20%, #8b2942 0%, transparent 55%),
    radial-gradient(circle at 80% 80%, #4a0e1f 0%, transparent 55%),
    linear-gradient(135deg, #3a0a17 0%, #6b1e2c 50%, #2a0710 100%);
}
.bg-noise {
  position: absolute; inset: 0;
  opacity: 0.18;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
}
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
/* Glows en unidades relativas para que escalen en cualquier pantalla */
.bg-glow-1 {
  width: 60vw; max-width: 600px; min-width: 280px;
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle, rgba(232,180,188,0.35), transparent 70%);
  top: -15vw; left: -15vw;
  animation: float-slow 14s ease-in-out infinite;
}
.bg-glow-2 {
  width: 70vw; max-width: 700px; min-width: 320px;
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle, rgba(166,61,91,0.4), transparent 70%);
  bottom: -20vw; right: -20vw;
  animation: float-slow 18s ease-in-out -7s infinite;
}

/* ===== Capa flotante FIJA al viewport ===== */
.floating-layer {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.piece {
  position: absolute;
  top: -50px;
  display: inline-block;
  animation: drift linear infinite;
  will-change: transform, opacity;
}
.piece-spark {
  filter: drop-shadow(0 0 6px rgba(243,217,177,0.6));
}
@keyframes drift {
  0%   { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.9; }
  50%  { transform: translate3d(40px, 55vh, 0) rotate(180deg); }
  90%  { opacity: 0.9; }
  100% { transform: translate3d(-40px, 110vh, 0) rotate(360deg); opacity: 0; }
}
@keyframes float-slow {
  0%, 100% { transform: translate(0, 0); }
  50%      { transform: translate(40px, -30px); }
}

/* ===== La carta ===== */
.letter {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 620px;
  background:
    radial-gradient(ellipse at top left, rgba(255,255,255,0.6), transparent 60%),
    linear-gradient(180deg, #fbf4e6 0%, #f3e4cc 100%);
  padding: clamp(24px, 5vw, 56px) clamp(20px, 5vw, 56px) clamp(24px, 4vw, 44px);
  border-radius: 4px;
  box-shadow:
    0 30px 60px -20px rgba(20, 4, 9, 0.7),
    0 10px 20px -10px rgba(20, 4, 9, 0.5),
    inset 0 0 60px rgba(140, 80, 50, 0.08);
  transform: translateY(20px) scale(0.97);
  opacity: 0;
  transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.letter.is-open {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.letter::before {
  content: "";
  position: absolute;
  inset: clamp(8px, 2vw, 12px);
  border: 1px solid rgba(122, 31, 51, 0.25);
  pointer-events: none;
  border-radius: 2px;
}
.letter::after {
  content: "";
  position: absolute;
  inset: clamp(12px, 2.5vw, 16px);
  border: 1px dashed rgba(122, 31, 51, 0.18);
  pointer-events: none;
  border-radius: 2px;
}
.letter-edge {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--burgundy-deep), var(--burgundy-soft), var(--burgundy-deep));
  opacity: 0.85;
  border-radius: 4px 4px 0 0;
}

.letter-head {
  text-align: center;
  margin-bottom: 8px;
}
.ornament {
  color: var(--burgundy);
  display: inline-flex;
  margin-bottom: 14px;
  opacity: 0.85;
}
.eyebrow {
  font-family: 'Cormorant Upright', serif;
  font-size: clamp(0.7rem, 2vw, 0.78rem);
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin: 0 0 6px;
  font-weight: 500;
}
.title {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.95;
}
.title-cinco {
  font-family: 'Dancing Script', cursive;
  font-weight: 700;
  font-size: clamp(4rem, 14vw, 7.5rem);
  background: linear-gradient(180deg, var(--burgundy-mid), var(--burgundy-deep));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: -0.15em;
  text-shadow: 0 2px 0 rgba(122,31,51,0.05);
}
.title-meses {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1rem, 3.5vw, 1.5rem);
  letter-spacing: 0.18em;
  text-transform: lowercase;
  color: var(--burgundy);
  margin-top: 8px;
}
.dedication {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(1.2rem, 3.5vw, 1.4rem);
  color: var(--burgundy-mid);
  margin: 16px 0 0;
}

/* ===== Imagen de los gatitos ===== */
.cats-wrap {
  display: flex;
  justify-content: center;
  margin: clamp(16px, 4vw, 24px) auto clamp(8px, 2vw, 12px);
  position: relative;
}
.cats-img-frame {
  position: relative;
  width: 100%;
  max-width: 440px;
  display: flex;
  justify-content: center;
}
.cats-img-frame::before {
  content: "";
  position: absolute;
  inset: -8% -4% -2% -4%;
  background: radial-gradient(
    ellipse at center,
    rgba(232, 180, 188, 0.45) 0%,
    rgba(232, 180, 188, 0.15) 45%,
    transparent 75%
  );
  filter: blur(20px);
  z-index: -1;
  pointer-events: none;
}
.cats-img {
  width: 100%;
  height: auto;
  display: block;
  filter:
    drop-shadow(0 8px 12px rgba(74, 14, 31, 0.2))
    drop-shadow(0 2px 4px rgba(74, 14, 31, 0.15));
  animation: cat-breathe 4.5s ease-in-out infinite;
  -webkit-mask-image: radial-gradient(ellipse at center, black 75%, transparent 98%);
          mask-image: radial-gradient(ellipse at center, black 75%, transparent 98%);
}
@keyframes cat-breathe {
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-4px) scale(1.012); }
}

.letter-body {
  margin-top: clamp(12px, 3vw, 18px);
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  line-height: 1.7;
  color: #2a0a14;
  font-weight: 400;
}
.msg-line {
  margin: 0.35em 0;
  opacity: 0;
  transform: translateY(8px);
  animation: line-in 0.9s ease forwards;
}
@keyframes line-in {
  to { opacity: 1; transform: translateY(0); }
}

.letter-foot {
  margin-top: clamp(20px, 5vw, 28px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 4vw, 22px);
}
.signature {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 360px;
}
.signature-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--burgundy-soft), transparent);
}
.signature-text {
  font-family: 'Dancing Script', cursive;
  font-size: clamp(1.2rem, 3.5vw, 1.4rem);
  color: var(--burgundy);
  white-space: nowrap;
}
.counter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.pill {
  font-family: 'Cormorant Upright', serif;
  font-size: clamp(0.65rem, 2vw, 0.72rem);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 6px 12px;
  border: 1px solid rgba(122, 31, 51, 0.35);
  border-radius: 999px;
  color: var(--burgundy-mid);
  background: rgba(255,255,255,0.4);
  transition: transform 0.3s ease;
}
.pill-on {
  background: var(--burgundy);
  color: var(--cream);
  border-color: var(--burgundy-deep);
  box-shadow: 0 6px 14px -4px rgba(74, 14, 31, 0.5);
  transform: translateY(-2px);
}

/* ===== Breakpoints ===== */
@media (max-width: 600px) {
  .carta-root {
    padding:
      calc(24px + env(safe-area-inset-top, 0px))
      14px
      calc(24px + env(safe-area-inset-bottom, 0px))
      14px;
  }
  .letter {
    padding: 28px 20px 24px;
  }
}

@media (max-width: 380px) {
  .letter {
    padding: 24px 16px 20px;
  }
  .signature { gap: 8px; }
  .pill { padding: 5px 9px; }
}

@media (min-width: 1200px) {
  .letter {
    max-width: 680px;
  }
}

/* Si el usuario prefiere menos movimiento, lo respetamos */
@media (prefers-reduced-motion: reduce) {
  .piece, .bg-glow, .cats-img, .letter, .msg-line {
    animation: none !important;
    transition: none !important;
  }
  .letter { opacity: 1; transform: none; }
  .msg-line { opacity: 1; transform: none; }
}
`;

export default CartaCincoMeses;