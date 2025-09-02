import './globals.css';

export const metadata = {
  title: 'GitHub Stats Generator',
  description: 'Generate dynamic GitHub stats SVGs for your profile',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}