import { createEmojiCanvas, canvasToBlob } from './canvas';

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function exportPng(emoji: string, size: number, filename: string): Promise<void> {
  const canvas = createEmojiCanvas(emoji, size);
  const blob = await canvasToBlob(canvas);
  const url = URL.createObjectURL(blob);
  triggerDownload(url, filename);
}
