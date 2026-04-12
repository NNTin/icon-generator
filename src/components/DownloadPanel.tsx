import { memo, useCallback, useState } from 'react';
import { useFaviconGenerator } from '../hooks/useFaviconGenerator';

interface DownloadPanelProps {
  emoji: string;
}

interface DownloadItem {
  type: Parameters<ReturnType<typeof useFaviconGenerator>['generateAndDownload']>[0];
  label: string;
  description: string;
}

const DOWNLOAD_ITEMS: DownloadItem[] = [
  { type: 'png16', label: 'favicon-16.png', description: '16×16 PNG' },
  { type: 'png32', label: 'favicon-32.png', description: '32×32 PNG' },
  { type: 'png48', label: 'favicon-48.png', description: '48×48 PNG' },
  { type: 'png180', label: 'apple-touch-icon.png', description: '180×180 PNG (iOS)' },
  { type: 'ico', label: 'favicon.ico', description: 'Multi-size ICO (16, 32, 48)' },
  { type: 'svg', label: 'favicon.svg', description: 'Scalable SVG' },
];

function DownloadPanel({ emoji }: DownloadPanelProps) {
  const { generating, generateAndDownload } = useFaviconGenerator(emoji);
  const [copied, setCopied] = useState(false);

  const htmlSnippet = `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`;

  const handleCopyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(htmlSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for non-secure contexts (HTTP) where Clipboard API is unavailable.
      // execCommand is deprecated but remains the only option in those environments.
      const ta = document.createElement('textarea');
      ta.value = htmlSnippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy'); // eslint-disable-line @typescript-eslint/no-deprecated
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [htmlSnippet]);

  return (
    <div className="download-section">
      <h2 className="section-title">Download</h2>

      <div className="download-list">
        {DOWNLOAD_ITEMS.map((item) => (
          <div key={item.type} className="download-row">
            <div className="download-info">
              <span className="download-filename">{item.label}</span>
              <span className="download-desc">{item.description}</span>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => generateAndDownload(item.type)}
              disabled={generating}
              aria-label={`Download ${item.label}`}
            >
              {generating ? '⏳' : '⬇'} Download
            </button>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary btn-full"
        onClick={() => generateAndDownload('zip')}
        disabled={generating}
      >
        {generating ? '⏳ Generating…' : '📦 Download All (ZIP)'}
      </button>

      <div className="html-snippet-section">
        <div className="snippet-header">
          <span className="snippet-title">HTML &lt;link&gt; tags</span>
          <button className="btn btn-ghost btn-sm" onClick={handleCopyHtml}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
        <pre className="code-block">{htmlSnippet}</pre>
      </div>
    </div>
  );
}

export default memo(DownloadPanel);
