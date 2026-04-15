import { useEffect, useRef } from 'react';
import { renderEmojiToCanvas } from '../utils/canvas';

export function useEmojiRenderer(
  emoji: string,
  size: number,
  font?: string
): React.RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        renderEmojiToCanvas(canvas, emoji, size, font);
      }
    };

    const frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [emoji, size, font]);

  return canvasRef;
}
