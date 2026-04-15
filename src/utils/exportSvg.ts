import { DEFAULT_FONT } from './emojiFont';

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSvgString(emoji: string, font: string = DEFAULT_FONT): string {
  const safeEmoji = escapeXml(emoji);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y=".9em" font-size="90" font-family="${escapeXml(font)}">${safeEmoji}</text>
</svg>`;
}

export async function exportSvg(emoji: string, filename: string, font?: string): Promise<void> {
  const svg = buildSvgString(emoji, font);
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
