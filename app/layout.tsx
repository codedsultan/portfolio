import type { Metadata, Viewport } from 'next';

import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import './globals.css';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { profile, seo } from '@/data/profile';
import { socialLinks } from '@/data/social';

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: '%s — Olusegun Ibraheem',
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: 'Olusegun Ibraheem' }],
  creator: 'Olusegun Ibraheem',
  openGraph: {
    type: 'website',
    title: seo.title,
    description: seo.description,
    url: seo.siteUrl,
    siteName: 'Olusegun Ibraheem',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
  },
  icons: {
    icon: '/favicon.svg',
  },
};

// Person structured data. Public profile links only: no phone, email or address.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.headline,
  url: seo.siteUrl,
  sameAs: socialLinks.filter((link) => link.url.startsWith('https://')).map((link) => link.url),
};

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          // Escape `<` so no string in the payload can close the script tag (Next JSON-LD guide).
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
        />
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
