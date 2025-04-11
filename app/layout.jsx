import "./globals.css";

export const metadata = {
  title: "Envia+",
  description: "Sistema de envío de correos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <link rel="preload" as="image" href="/bg.webp" />

      <body>{children}</body>
    </html>
  );
}

import "./globals.css";
