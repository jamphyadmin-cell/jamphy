import "./globals.css";
import { Providers } from "../components/Providers";
import { TransitionProvider } from "../components/TransitionProvider";
import AdminShortcut from "../components/AdminShortcut";

export const metadata = {
  metadataBase: new URL("https://jamphy.com"),
  title: {
    default: "jamphy | IIT JAM Physics PYQs & Prep",
    template: "%s | jamphy"
  },
  description: "Practice IIT JAM Physics previous year questions (PYQs) with math-ready explanations. Track weak topics and dominate your IIT JAM preparation.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "jamphy | IIT JAM Physics PYQs & Prep",
    description: "Practice IIT JAM Physics previous year questions (PYQs) with math-ready explanations. Track weak topics and dominate your IIT JAM preparation.",
    url: "https://jamphy.com",
    siteName: "jamphy",
    images: [
      {
        url: "/og-image.png", // Next.js will resolve this
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "jamphy | IIT JAM Physics PYQs & Prep",
    description: "Practice IIT JAM Physics previous year questions (PYQs) with math-ready explanations.",
    images: ["/og-image.png"],
  },
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
