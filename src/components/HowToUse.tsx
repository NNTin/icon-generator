import { memo, useState, useCallback } from 'react';

interface Step {
  title: string;
  content: string;
  code?: string;
}

const STEPS: Step[] = [
  {
    title: '1. Enter your emoji',
    content: 'Type any emoji in the input field or pick from the presets. The preview updates instantly.',
  },
  {
    title: '2. Download your favicons',
    content: 'Download individual files or use "Download All" to get a ZIP with everything you need.',
  },
  {
    title: '3. Add to your project',
    content: 'Place the files in your project root and add these tags to your HTML <head>:',
    code: `<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">`,
  },
  {
    title: '4. Vite / Next.js tip',
    content: 'Put favicon files in the public/ directory. For Next.js App Router, use app/favicon.ico.',
    code: `public/
  favicon.ico
  favicon.svg
  favicon-16.png
  favicon-32.png
  apple-touch-icon.png`,
  },
];

interface CodeBlockProps {
  code: string;
  id: string;
}

function CodeBlock({ code, id }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback for non-secure contexts (HTTP) where Clipboard API is unavailable.
      // execCommand is deprecated but remains the only option in those environments.
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy'); // eslint-disable-line @typescript-eslint/no-deprecated
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="code-block-wrapper">
      <button
        className="btn btn-ghost btn-sm copy-btn"
        onClick={handleCopy}
        aria-label={`Copy code block ${id}`}
      >
        {copied ? '✓ Copied' : '📋 Copy'}
      </button>
      <pre className="code-block">{code}</pre>
    </div>
  );
}

function HowToUse() {
  return (
    <div className="how-to-section">
      <h2 className="section-title">How to Use</h2>
      <div className="steps-list">
        {STEPS.map((step, i) => (
          <div key={i} className="step-item">
            <h3 className="step-title">{step.title}</h3>
            <p className="step-content">{step.content}</p>
            {step.code && <CodeBlock code={step.code} id={String(i)} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(HowToUse);
