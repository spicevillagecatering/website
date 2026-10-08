import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Spice Village Catering',
    short_name: 'Spice Village',
    description: 'Authentic South Indian catering in Dublin',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#7a1010',
    icons: [{ src: '/icon.png', sizes: '512x512', type: 'image/png' }],
  };
}
