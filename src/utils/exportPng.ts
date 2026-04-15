import { createEmojiCanvas, canvasToBlob } from './canvas';

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export async function exportPng(
  emoji: string,
  size: number,
  filename: string,
  font?: string
): Promise<void> {
  const canvas = createEmojiCanvas(emoji, size, font);
  const blob = await canvasToBlob(canvas);
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
}
