import type { Metadata, Viewport } from 'next';
import './globals.css';
import { brand } from '@/lib/brand';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://as-plastics.vercel.app';

export const metadata: Metadata = {
  title: 'A S Plastics | Injection Mould & Plastic Die Manufacturer, Nashik',
  description:
    'A S Plastics, Nashik: precision tool room and moulding job works, injection moulding dies, mould bases, and heavy VMC machining services. Established in 2015.',
  keywords: [
    'A S Plastics',
    'Injection moulding dies Nashik',
    'Plastic mould manufacturer',
    'VMC machining Nashik',
    'Mould base tool room',
    'SICOF Satpur MIDC',
    'Industrial plastic dies',
  ],
  authors: [{ name: brand.owner }],
  creator: brand.name,
  openGraph: {
    title: 'A S Plastics — Precision Moulds & Machining, Nashik',
    description: brand.description,
    url: siteUrl,
    siteName: 'A S Plastics',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A S Plastics | Precision Moulds & Machining, Nashik',
    description: brand.description,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#101622',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: brand.name,
    founder: brand.owner,
    foundingDate: brand.establishedYear,
    address: {
      '@type': 'PostalAddress',
      streetAddress: brand.address,
      addressLocality: brand.city,
      addressRegion: brand.state,
      postalCode: brand.pincode,
      addressCountry: 'IN',
    },
    telephone: brand.phoneNumbers.map((num: string) => `+91 ${num}`),
    description: brand.description,
    url: siteUrl,
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
