import { canvasToBlob } from './canvas';
import { DEFAULT_FONT } from './emojiFont';

export const PWA_SIZES = [72, 96, 128, 144, 152, 192, 384, 512] as const;
export type PwaSize = typeof PWA_SIZES[number];

export const MASKABLE_SIZES = [192, 512] as const;
export type MaskableSize = typeof MASKABLE_SIZES[number];

/** The emoji renders within the inner 80 % of the canvas — 10 % safe padding on each side.
 *  This meets the PWA maskable icon spec which requires a minimum safe zone of 40 px
 *  inscribed-circle radius at 192 px (≈ 83 % of canvas). */
export const MASKABLE_SCALE = 0.8;

export function createPwaIconCanvas(
  emoji: string,
  size: number,
  font: string = DEFAULT_FONT
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, size, size);
  const fontSize = size * 0.75;
  ctx.font = `${fontSize}px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2);

  return canvas;
}

export function createMaskableIconCanvas(
  emoji: string,
  size: number,
  font: string = DEFAULT_FONT
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.clearRect(0, 0, size, size);
  const fontSize = size * 0.75 * MASKABLE_SCALE;
  ctx.font = `${fontSize}px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, size / 2, size / 2);

  return canvas;
}

export interface PwaIconEntry {
  size: number;
  filename: string;
  blob: Blob;
}

export interface PwaIconSet {
  regular: PwaIconEntry[];
  maskable: PwaIconEntry[];
}

export async function generatePwaIconSet(
  emoji: string,
  font: string = DEFAULT_FONT
): Promise<PwaIconSet> {
  const regular = await Promise.all(
    PWA_SIZES.map(async (size) => {
      const canvas = createPwaIconCanvas(emoji, size, font);
      const blob = await canvasToBlob(canvas);
      return { size, filename: `icon-${size}.png`, blob };
    })
  );

  const maskable = await Promise.all(
    MASKABLE_SIZES.map(async (size) => {
      const canvas = createMaskableIconCanvas(emoji, size, font);
      const blob = await canvasToBlob(canvas);
      return { size, filename: `icon-${size}-maskable.png`, blob };
    })
  );

  return { regular, maskable };
}
