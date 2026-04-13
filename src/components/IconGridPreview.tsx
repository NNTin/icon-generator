import { memo, useEffect, useRef } from 'react';
import { PWA_SIZES, MASKABLE_SIZES, MASKABLE_SCALE } from '../utils/pwaIcons';

const DISPLAY_SIZE = 56;

interface PreviewItemProps {
  emoji: string;
  label: string;
  maskable?: boolean;
}

function PreviewItem({ emoji, label, maskable = false }: PreviewItemProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = DISPLAY_SIZE * dpr;
      canvas.height = DISPLAY_SIZE * dpr;
      canvas.style.width = `${DISPLAY_SIZE}px`;
      canvas.style.height = `${DISPLAY_SIZE}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, DISPLAY_SIZE, DISPLAY_SIZE);

      const scale = maskable ? MASKABLE_SCALE : 1;
      const fontSize = DISPLAY_SIZE * 0.75 * scale;
      ctx.font = `${fontSize}px 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, DISPLAY_SIZE / 2, DISPLAY_SIZE / 2);
    };

    const frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, [emoji, maskable]);

  return (
    <div className="preview-item">
      <div className="canvas-wrapper" style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE }}>
        <canvas ref={canvasRef} />
      </div>
      <span className="size-label">{label}</span>
    </div>
  );
}

interface IconGridPreviewProps {
  emoji: string;
}

function IconGridPreview({ emoji }: IconGridPreviewProps) {
  return (
    <div className="pwa-icon-grid-section">
      <h3 className="pwa-subsection-title">Regular icons</h3>
      <div className="preview-grid">
        {[...PWA_SIZES].map((size) => (
          <PreviewItem key={size} emoji={emoji} label={`${size}×${size}`} />
        ))}
      </div>

      <h3 className="pwa-subsection-title" style={{ marginTop: '1.25rem' }}>
        Maskable icons <span className="pwa-badge">safe zone</span>
      </h3>
      <div className="preview-grid">
        {[...MASKABLE_SIZES].map((size) => (
          <PreviewItem key={size} emoji={emoji} label={`${size}×${size}`} maskable />
        ))}
      </div>
    </div>
  );
}

export default memo(IconGridPreview);
