import "./globals.css";
import { Providers } from "../components/Providers";
import { TransitionProvider } from "../components/TransitionProvider";
import AdminShortcut from "../components/AdminShortcut";

export const metadata = {
  title: "jamphy",
  description: "Practice IIT JAM Physics questions with math-ready explanations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark scroll-smooth"
    >
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;700&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@500;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Providers>
          <TransitionProvider>
            {children}
            <AdminShortcut />
          </TransitionProvider>
        </Providers>
      </body>
    </html>
  );
}
