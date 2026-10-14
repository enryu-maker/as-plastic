import type { Metadata, Viewport } from 'next';
import './globals.css';
import { brand, siteUrl } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'A S Plastics | Injection Mould & Die Maker, Nashik',
  description:
    'A S Plastics, Nashik: injection moulding dies, plastic moulds, mould bases, VMC machining and mould maintenance since 2015. Call or WhatsApp for a quote.',
  keywords: [
    'A S Plastics',
    'Injection moulding dies Nashik',
    'Plastic mould manufacturer',
    'VMC machining Nashik',
    'Mould base tool room',
    'SICOF Satpur MIDC',
    'Industrial plastic dies',
    'Mould maintenance Nashik',
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
    '@id': `${siteUrl}/#business`,
    name: brand.name,
    alternateName: brand.alternateNames,
    description: brand.description,
    url: siteUrl,
    logo: `${siteUrl}/assets/as-plastics-logo.png`,
    image: `${siteUrl}/opengraph-image`,
    founder: { '@type': 'Person', name: brand.owner, jobTitle: 'Proprietor' },
    foundingDate: brand.establishedYear,
    email: brand.email,
    telephone: ['+91 253 4534690', ...brand.phoneNumbers.map((num: string) => `+91 ${num}`)],
    taxID: brand.gstin,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. 69, Gala No. 394, SICOF MIDC, Satpur',
      addressLocality: brand.city,
      addressRegion: brand.state,
      postalCode: brand.pincode,
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Nashik' },
      { '@type': 'State', name: 'Maharashtra' },
      { '@type': 'Country', name: 'India' },
    ],
    knowsAbout: ['Injection moulding dies', 'Plastic moulds', 'Mould bases', 'VMC machining', 'Die casting moulds', 'Mould maintenance'],
    makesOffer: [
      'Injection Moulding Dies',
      'Plastic Mould Dies',
      'VMC Machining Work',
      'Mould Base Work',
      'Die Casting Moulds',
      'Mould Maintenance & Repair',
    ].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
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
