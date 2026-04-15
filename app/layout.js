import './globals.css';

export const metadata = {
  title: 'TaxcService | Premium Auckland Transport & Chauffeur Service',
  description:
    "Auckland's trusted private transport and chauffeur service. Airport transfers, corporate transport, wedding cars, group transport and New Zealand tours. Book your ride today!",
  keywords: [
    'Auckland transport',
    'chauffeur service',
    'airport transfer Auckland',
    'wedding car hire',
    'corporate transport NZ',
    'New Zealand tours',
  ],
  metadataBase: new URL('https://taxcservice.com'),
  openGraph: {
    title: 'TaxcService | Premium Auckland Transport & Chauffeur Service',
    description:
      'Professional private transport and chauffeur service in Auckland, New Zealand.',
    url: 'https://taxcservice.com',
    siteName: 'TaxcService',
    locale: 'en_NZ',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}