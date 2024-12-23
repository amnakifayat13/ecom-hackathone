import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";
import StoreProvider from "../../storeProvider/storeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Amna Aftab Kifayat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <StoreProvider>
     <html lang="en">
      <body className={inter.className}>
        <Nav/>
        {children}
        <Toaster/>
        <Footer/>
        </body>
    </html>
   </StoreProvider>
  );
}
