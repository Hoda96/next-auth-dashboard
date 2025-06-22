import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";

const vazirmatn = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic"],
});


export const metadata: Metadata = {
  title: 'Authentication System',
  description: 'A simple authentication system with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vazirmatn.variable} `}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
