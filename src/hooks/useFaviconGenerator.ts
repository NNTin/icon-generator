import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { exportPng } from '../utils/exportPng';
import { exportIco, buildIcoFromPngBlobs } from '../utils/exportIco';
import { exportSvg, buildSvgString } from '../utils/exportSvg';
import { createEmojiCanvas, canvasToBlob } from '../utils/canvas';
import { generatePwaIconSet } from '../utils/pwaIcons';
import { buildManifestString } from '../utils/manifest';

type DownloadType = 'png16' | 'png32' | 'png48' | 'png180' | 'ico' | 'svg' | 'zip';

interface FaviconGenerator {
  generating: boolean;
  generateAndDownload: (type: DownloadType) => Promise<void>;
}

export function useFaviconGenerator(emoji: string, font?: string): FaviconGenerator {
  const [generating, setGenerating] = useState(false);

  const generateAndDownload = useCallback(
    async (type: DownloadType) => {
      setGenerating(true);
      try {
        switch (type) {
          case 'png16':
            await exportPng(emoji, 16, 'favicon-16.png', font);
            break;
          case 'png32':
            await exportPng(emoji, 32, 'favicon-32.png', font);
            break;
          case 'png48':
            await exportPng(emoji, 48, 'favicon-48.png', font);
            break;
          case 'png180':
            await exportPng(emoji, 180, 'apple-touch-icon.png', font);
            break;
          case 'ico':
            await exportIco(emoji, 'favicon.ico', font);
            break;
          case 'svg':
            await exportSvg(emoji, 'favicon.svg', font);
            break;
          case 'zip':
            await exportZip(emoji, font);
            break;
        }
      } finally {
        setGenerating(false);
      }
    },
    [emoji, font]
  );

  return { generating, generateAndDownload };
}

async function exportZip(emoji: string, font?: string): Promise<void> {
  const zip = new JSZip();

  const faviconSizes: Array<[number, string]> = [
    [16, 'favicon-16.png'],
    [32, 'favicon-32.png'],
    [48, 'favicon-48.png'],
    [180, 'apple-touch-icon.png'],
  ];

  const pngBlobs = await Promise.all(
    faviconSizes.map(async ([size]) => {
      const canvas = createEmojiCanvas(emoji, size, font);
      return canvasToBlob(canvas);
    })
  );

  faviconSizes.forEach(([, filename], i) => {
    zip.file(filename, pngBlobs[i]);
  });

  // Build ICO from the 16, 32, 48 PNG blobs (first three entries)
  const icoBlob = await buildIcoFromPngBlobs(pngBlobs.slice(0, 3));
  zip.file('favicon.ico', icoBlob);

  // Use the shared SVG builder to ensure XML entities are escaped
  zip.file('favicon.svg', buildSvgString(emoji, font));

  // PWA icons
  const pwaIconSet = await generatePwaIconSet(emoji, font);
  for (const entry of pwaIconSet.regular) {
    zip.file(`pwa-icons/${entry.filename}`, entry.blob);
  }
  for (const entry of pwaIconSet.maskable) {
    zip.file(`pwa-icons/${entry.filename}`, entry.blob);
  }

  // manifest.json — icons reference pwa-icons/ subfolder to match the ZIP layout above
  zip.file('manifest.json', buildManifestString('pwa-icons/'));

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tin-can-of-icons.zip';
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
