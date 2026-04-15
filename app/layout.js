import './globals.css';

export const metadata = {
  title: 'TaxcService | Premium Auckland Transport & Chauffeur Service',
  description: 'Auckland\'s trusted private transport and chauffeur service. Airport transfers, corporate transport, wedding cars, group transport & NZ tours. Book your ride today!',
  keywords: 'Auckland transport, chauffeur service, airport transfer Auckland, wedding car hire, corporate transport NZ, New Zealand tours',
  openGraph: {
    title: 'TaxcService | Premium Auckland Transport & Chauffeur Service',
    description: 'Professional private transport and chauffeur service in Auckland, New Zealand.',
    url: 'https://taxcservice.com',
    siteName: 'TaxcService',
    locale: 'en_NZ',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
