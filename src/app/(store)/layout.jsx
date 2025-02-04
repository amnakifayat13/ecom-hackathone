import { Inter } from 'next/font/google';
import "../globals.css";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";
import StoreProvider from "../../../storeProvider/storeProvider";
import { ClerkProvider } from '@clerk/nextjs'; // Import ClerkProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce Store",
  description: "Amna Aftab Kifayat",
};

export default function RootLayout({
  children,
}
// : Readonly<{
//   children: React.ReactNode;
// }>
) {
  return (
    <StoreProvider dynamic>
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <Nav />
            {children}
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </StoreProvider>
  );
}
