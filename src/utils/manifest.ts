export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

export interface WebManifest {
  name: string;
  short_name: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: ManifestIcon[];
}

/**
 * @param iconPathPrefix - Optional prefix prepended to each icon filename in the `src` field.
 *   Use `''` (default) when icons live at the web root (e.g. standalone PWA pack).
 *   Use `'pwa-icons/'` when icons are placed under a `pwa-icons/` subfolder
 *   (e.g. the combined `tin-can-of-icons.zip` layout).
 */
export function buildManifest(iconPathPrefix = ''): WebManifest {
  const p = iconPathPrefix;
  return {
    name: 'My App',
    short_name: 'My App',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f14',
    theme_color: '#0ea5e9',
    icons: [
      { src: `/${p}icon-72.png`,  sizes: '72x72',   type: 'image/png' },
      { src: `/${p}icon-96.png`,  sizes: '96x96',   type: 'image/png' },
      { src: `/${p}icon-128.png`, sizes: '128x128', type: 'image/png' },
      { src: `/${p}icon-144.png`, sizes: '144x144', type: 'image/png' },
      { src: `/${p}icon-152.png`, sizes: '152x152', type: 'image/png' },
      { src: `/${p}icon-192.png`, sizes: '192x192', type: 'image/png' },
      { src: `/${p}icon-384.png`, sizes: '384x384', type: 'image/png' },
      { src: `/${p}icon-512.png`, sizes: '512x512', type: 'image/png' },
      { src: `/${p}icon-192-maskable.png`, sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: `/${p}icon-512-maskable.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

export function buildManifestString(iconPathPrefix = ''): string {
  return JSON.stringify(buildManifest(iconPathPrefix), null, 2);
}
