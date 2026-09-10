import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CodeQuest — Learn to Code by Playing",
    template: "%s | CodeQuest",
  },
  description:
    "Master programming through gamified challenges. Write real code, get instant feedback, unlock new skills. Learn HTML, CSS, JavaScript, Python, SQL, and 40+ more languages.",
  keywords: ["coding", "programming", "learn to code", "gamification", "JavaScript", "Python", "SQL"],
  openGraph: {
    title: "CodeQuest — Gamified Programming Learning",
    description: "Write code → Get feedback → Level up. The most fun way to learn programming.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="animated-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
