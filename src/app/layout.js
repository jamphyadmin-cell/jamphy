import "./globals.css";
import { Providers } from "../components/Providers";
import { TransitionProvider } from "../components/TransitionProvider";
import AdminShortcut from "../components/AdminShortcut";

export const metadata = {
  title: "IIT JAM Physics Hub",
  description: "Practice IIT JAM Physics questions with math-ready explanations.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
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
