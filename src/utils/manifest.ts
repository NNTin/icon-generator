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

export function buildManifest(): WebManifest {
  return {
    name: 'My App',
    short_name: 'My App',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f14',
    theme_color: '#0ea5e9',
    icons: [
      { src: '/icon-72.png',  sizes: '72x72',   type: 'image/png' },
      { src: '/icon-96.png',  sizes: '96x96',   type: 'image/png' },
      { src: '/icon-128.png', sizes: '128x128', type: 'image/png' },
      { src: '/icon-144.png', sizes: '144x144', type: 'image/png' },
      { src: '/icon-152.png', sizes: '152x152', type: 'image/png' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-384.png', sizes: '384x384', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

export function buildManifestString(): string {
  return JSON.stringify(buildManifest(), null, 2);
}
