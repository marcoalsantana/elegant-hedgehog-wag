import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import TabReminders from "@/components/TabReminders";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agência Obra | Arquitetura",
  description: "Agência de Arquitetura de Luxo. Projetos cinematográficos com design de alto padrão.",
  openGraph: {
    title: "Agência Obra | Arquitetura",
    description: "Agência de Arquitetura de Luxo. Projetos cinematográficos com design de alto padrão.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} h-full antialiased bg-black text-white`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <CustomCursor />
        <TabReminders />
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
