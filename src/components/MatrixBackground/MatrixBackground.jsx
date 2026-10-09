import { useEffect, useRef } from 'react';
import styles from './MatrixBackground.module.css';

// Repeated binary digits make 0 and 1 the most common characters.
const characters = '01010101010101010101010101010101{}[]()<>&|^~*/%+=!;:#';
const fontSize = 18;
const columnSpacing = (fontSize * 2) / 1.75;
const trailLength = 10;
const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)];

export const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let drops = [];
    let frameId;
    let lastFrame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drops = Array.from({ length: Math.ceil(width / columnSpacing) }, () => ({
        y: Math.random() * (height + trailLength * fontSize),
        speed: 140 + Math.random() * 87.5,
        symbols: Array.from({ length: trailLength }, randomCharacter),
      }));
    };

    const draw = timestamp => {
      frameId = window.requestAnimationFrame(draw);
      if (timestamp - lastFrame < 1000 / 30) return;
      const elapsed = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.1) : 0;
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);
      context.font = `${fontSize}px monospace`;
      drops.forEach(drop => {
        drop.y += drop.speed * elapsed;
        if (drop.y - trailLength * fontSize > height) {
          drop.y = -fontSize - Math.random() * height * 0.3;
          drop.symbols = Array.from({ length: trailLength }, randomCharacter);
        }
      });
      drops.forEach((drop, column) => {
        drop.symbols.forEach((character, index) => {
          context.fillStyle = index === 0 ? '#a8ffbc' : '#00ff41';
          context.globalAlpha = index === 0 ? 1 : 0.6 * (1 - index / trailLength);
          context.fillText(character, column * columnSpacing, drop.y - index * fontSize);
        });
      });
      context.globalAlpha = 1;
    };

    const updateAnimation = () => {
      window.cancelAnimationFrame(frameId);
      if (motionPreference.matches || document.hidden) {
        if (motionPreference.matches) context.clearRect(0, 0, width, height);
        return;
      }
      lastFrame = 0;
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    updateAnimation();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', updateAnimation);
    motionPreference.addEventListener('change', updateAnimation);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', updateAnimation);
      motionPreference.removeEventListener('change', updateAnimation);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.background} aria-hidden="true" />;
};
