import { useState, useCallback } from 'react';
import EmojiInput from '../components/EmojiInput';
import PreviewCanvas from '../components/PreviewCanvas';
import DownloadPanel from '../components/DownloadPanel';
import HowToUse from '../components/HowToUse';
import ThemeToggle from '../components/ThemeToggle';
import PWAExportPanel from '../components/PWAExportPanel';

export default function Home() {
  const [emoji, setEmoji] = useState('🥫');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const handleEmojiChange = useCallback((next: string) => {
    setEmoji(next);
  }, []);

  return (
    <div className="page">
      <header className="header">
        <div className="header-inner container">
          <div className="logo">
            <span className="logo-icon">🥫</span>
            <div className="logo-text">
              <span className="logo-name">Tin</span>
              <span className="logo-tagline">Can of Icons</span>
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="main container">
        <div className="hero">
          <h1 className="hero-title">
            Generate <span className="accent">favicons & PWA icons</span> from any emoji
          </h1>
          <p className="hero-subtitle">
            No servers. No uploads. Everything runs in your browser.
          </p>
        </div>

        <div className="content-grid">
          <div className="left-col">
            <EmojiInput emoji={emoji} onChange={handleEmojiChange} />
            <HowToUse />
          </div>
          <div className="right-col">
            <PreviewCanvas emoji={emoji} />
            <DownloadPanel emoji={emoji} />
          </div>
        </div>

        <div className="pwa-section">
          <div className="pwa-section-header">
            <h2 className="pwa-section-title">
              📱 PWA Icon Pack Generator
            </h2>
            <p className="pwa-section-subtitle">
              Generate a complete set of Progressive Web App icons and a ready-to-use
              <code>manifest.json</code> — making your site installable in seconds.
            </p>
          </div>
          <PWAExportPanel emoji={emoji} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            🥫 Tin — Emoji favicon &amp; PWA icon generator. Runs entirely in your browser.
            Built with React + Vite.
          </p>
        </div>
      </footer>
    </div>
  );
}
