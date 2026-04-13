import { useCallback, useState } from 'react';
import JSZip from 'jszip';
import { generatePwaIconSet } from '../utils/pwaIcons';
import { buildManifestString } from '../utils/manifest';

interface PwaIconGenerator {
  generating: boolean;
  downloadPwaPack: () => Promise<void>;
}

function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function usePwaIconGenerator(emoji: string): PwaIconGenerator {
  const [generating, setGenerating] = useState(false);

  const downloadPwaPack = useCallback(async () => {
    setGenerating(true);
    try {
      const zip = new JSZip();
      const iconSet = await generatePwaIconSet(emoji);

      for (const entry of iconSet.regular) {
        zip.file(entry.filename, entry.blob);
      }
      for (const entry of iconSet.maskable) {
        zip.file(entry.filename, entry.blob);
      }

      zip.file('manifest.json', buildManifestString());

      const content = await zip.generateAsync({ type: 'blob' });
      triggerDownload(URL.createObjectURL(content), 'pwa-icon-pack.zip');
    } finally {
      setGenerating(false);
    }
  }, [emoji]);

  return { generating, downloadPwaPack };
}
