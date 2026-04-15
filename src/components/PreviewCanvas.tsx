import { memo } from 'react';
import { useEmojiRenderer } from '../hooks/useEmojiRenderer';

const PREVIEW_SIZES = [16, 32, 48, 180] as const;

interface SizeCanvasProps {
  emoji: string;
  size: typeof PREVIEW_SIZES[number];
  font?: string;
}

function SizeCanvas({ emoji, size, font }: SizeCanvasProps) {
  const canvasRef = useEmojiRenderer(emoji, size, font);

  const displaySize = size < 64 ? Math.max(size * 2, 48) : size;
  const isSmall = size < 64;

  return (
    <div className="preview-item">
      <div
        className="canvas-wrapper"
        style={{ width: displaySize, height: displaySize }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: displaySize,
            height: displaySize,
            imageRendering: isSmall ? 'pixelated' : 'auto',
          }}
        />
      </div>
      <span className="size-label">{size}×{size}</span>
    </div>
  );
}

interface PreviewCanvasProps {
  emoji: string;
  font?: string;
}

function PreviewCanvas({ emoji, font }: PreviewCanvasProps) {
  return (
    <div className="preview-section">
      <h2 className="section-title">Preview</h2>
      <div className="preview-grid">
        {PREVIEW_SIZES.map((size) => (
          <SizeCanvas key={size} emoji={emoji} size={size} font={font} />
        ))}
      </div>
    </div>
  );
}

export default memo(PreviewCanvas);
