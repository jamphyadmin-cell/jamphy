import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
