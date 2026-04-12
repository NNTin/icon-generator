import { createEmojiCanvas, canvasToBlob } from './canvas';

/**
 * Builds a .ico file containing multiple PNG images.
 * Uses the modern PNG-in-ICO format, supported by all current browsers and OSes.
 */
export async function buildIcoFromPngBlobs(pngBlobs: Blob[]): Promise<Blob> {
  const pngBuffers = await Promise.all(pngBlobs.map((b) => b.arrayBuffer()));

  const count = pngBuffers.length;
  // ICO header = 6 bytes; each directory entry = 16 bytes
  const headerSize = 6 + count * 16;

  // Compute offsets
  const offsets: number[] = [];
  let offset = headerSize;
  for (const buf of pngBuffers) {
    offsets.push(offset);
    offset += buf.byteLength;
  }

  const totalSize = offset;
  const icoBuffer = new ArrayBuffer(totalSize);
  const view = new DataView(icoBuffer);

  // ICO header
  view.setUint16(0, 0, true);  // reserved
  view.setUint16(2, 1, true);  // type: 1 = ICO
  view.setUint16(4, count, true);

  // Directory entries
  for (let i = 0; i < count; i++) {
    const base = 6 + i * 16;
    const imgView = new DataView(pngBuffers[i]);
    // PNG IHDR: width at offset 16, height at offset 20 (after 8-byte sig + 4 len + 4 "IHDR")
    const width = imgView.getUint32(16, false);
    const height = imgView.getUint32(20, false);

    view.setUint8(base + 0, width >= 256 ? 0 : width);
    view.setUint8(base + 1, height >= 256 ? 0 : height);
    view.setUint8(base + 2, 0);   // color count (0 = no palette)
    view.setUint8(base + 3, 0);   // reserved
    view.setUint16(base + 4, 1, true);  // color planes
    view.setUint16(base + 6, 32, true); // bits per pixel
    view.setUint32(base + 8, pngBuffers[i].byteLength, true);
    view.setUint32(base + 12, offsets[i], true);
  }

  // PNG data
  let writePos = headerSize;
  for (const buf of pngBuffers) {
    const src = new Uint8Array(buf);
    const dst = new Uint8Array(icoBuffer, writePos, buf.byteLength);
    dst.set(src);
    writePos += buf.byteLength;
  }

  return new Blob([icoBuffer], { type: 'image/x-icon' });
}

export async function exportIco(emoji: string, filename: string): Promise<void> {
  const sizes = [16, 32, 48] as const;

  const pngBlobs = await Promise.all(
    sizes.map((size) => {
      const canvas = createEmojiCanvas(emoji, size);
      return canvasToBlob(canvas);
    })
  );

  const blob = await buildIcoFromPngBlobs(pngBlobs);
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

