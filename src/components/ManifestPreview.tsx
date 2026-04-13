import { memo, useState, useCallback } from 'react';
import { useManifestGenerator } from '../hooks/useManifestGenerator';

function ManifestPreview() {
  const { manifestJson, downloadManifest } = useManifestGenerator();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(manifestJson);
    } catch {
      // Fallback for non-secure contexts (HTTP) where Clipboard API is unavailable.
      // execCommand is deprecated but remains the only option in those environments.
      const ta = document.createElement('textarea');
      ta.value = manifestJson;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [manifestJson]);

  return (
    <div className="html-snippet-section">
      <div className="snippet-header">
        <span className="snippet-title">manifest.json</span>
        <div className="snippet-actions">
          <button className="btn btn-ghost btn-sm" onClick={handleCopy}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={downloadManifest}>
            ⬇ Download
          </button>
        </div>
      </div>
      <pre className="code-block">{manifestJson}</pre>
    </div>
  );
}

export default memo(ManifestPreview);
