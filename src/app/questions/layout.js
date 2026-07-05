export const metadata = {
  title: "IIT JAM Physics PYQs | Subject-wise Questions | jamphy",
  description: "Browse our complete vault of IIT JAM Physics previous year questions. Filter by topic, year, or format (MCQ, MSQ, NAT) and start practicing for free.",
  alternates: {
    canonical: "/questions",
  },
  openGraph: {
    title: "IIT JAM Physics PYQs | Subject-wise Questions | jamphy",
    description: "Browse our complete vault of IIT JAM Physics previous year questions. Filter by topic, year, or format.",
    url: "https://jamphy.com/questions",
  }
};

export default function QuestionsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://jamphy.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "IIT JAM Physics PYQs",
                "item": "https://jamphy.com/questions"
              }
            ]
          })
        }}
      />
      {children}
    </>
  );
}
