import { useEffect, useRef } from 'react';
import { renderEmojiToCanvas } from '../utils/canvas';

export function useEmojiRenderer(
  emoji: string,
  size: number
): React.RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let frameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        renderEmojiToCanvas(canvas, emoji, size);
      }
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [emoji, size]);

  return canvasRef;
}
