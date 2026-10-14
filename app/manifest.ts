import type { MetadataRoute } from 'next';
import { brand } from '@/lib/brand';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} | Tool Room & Mould Makers, Nashik`,
    short_name: brand.name,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#101622',
    icons: [{ src: '/icon.png', sizes: '192x192', type: 'image/png' }],
  };
}
