import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";
import StoreProvider from "../../storeProvider/storeProvider";


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
   
     <html lang="en">
      <body className={inter.className}>
      <StoreProvider>
        <Nav/>
        {children}
        <Footer/>
        </StoreProvider>
        </body>
    </html>
   
  );
}
