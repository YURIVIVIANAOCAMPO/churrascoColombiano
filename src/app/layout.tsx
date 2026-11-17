import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getStoreData } from '@/lib/store';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0e1013',
};

export async function generateMetadata(): Promise<Metadata> {
  const store = getStoreData();
  const { config, seo } = store;

  return {
    title: {
      default: seo.metaTitle || `${config.name} | Restaurante & Cardápio Digital`,
      template: `%s | ${config.name}`,
    },
    description: seo.metaDescription,
    keywords: seo.keywords.split(',').map((k) => k.trim()),
    metadataBase: new URL(seo.canonicalUrl || 'http://localhost:3000'),
    alternates: {
      canonical: '/',
      languages: {
        'pt-BR': '/',
        'es-CO': '/',
      },
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.canonicalUrl || 'http://localhost:3000',
      siteName: config.name,
      images: [
        {
          url: '/logo.jpeg',
          width: 800,
          height: 800,
          alt: config.name,
        },
      ],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: ['/logo.jpeg'],
    },
    icons: {
      icon: '/logo.jpeg',
      apple: '/logo.jpeg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = getStoreData();
  const { config, seo } = store;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: config.name,
    image: 'http://localhost:3000/logo.jpeg',
    telephone: config.phone,
    servesCuisine: ['Churrasco', 'Carnes na Brasa', 'Parrilla', 'Espetinhos', 'Cortes Nobres'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.address,
      addressLocality: config.city,
      addressCountry: 'BR',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:30',
        closes: '23:00',
      },
    ],
    menu: 'http://localhost:3000/#menu',
    url: seo.canonicalUrl || 'http://localhost:3000',
    sameAs: [
      config.social?.instagram,
    ].filter(Boolean),
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://wa.me/${config.whatsapp}`,
        inLanguage: ['pt', 'es'],
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="theme-color" content="#0e1013" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {seo.googleAnalyticsId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(seo.googleAnalyticsId)}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${encodeURIComponent(seo.googleAnalyticsId)}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {seo.googleAdsId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                gtag('config', '${encodeURIComponent(seo.googleAdsId)}');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen bg-[#0e1013] text-zinc-100 flex flex-col antialiased selection:bg-amber-600 selection:text-white">
        <div className="colombian-bar w-full" />
        {children}
      </body>
    </html>
  );
}
