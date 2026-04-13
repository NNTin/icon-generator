import { useCallback } from 'react';
import { buildManifest, buildManifestString, type WebManifest } from '../utils/manifest';

interface ManifestGenerator {
  manifest: WebManifest;
  manifestJson: string;
  downloadManifest: () => void;
}

export function useManifestGenerator(): ManifestGenerator {
  const manifest = buildManifest();
  const manifestJson = buildManifestString();

  const downloadManifest = useCallback(() => {
    const json = buildManifestString();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest.json';
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, []);

  return { manifest, manifestJson, downloadManifest };
}
