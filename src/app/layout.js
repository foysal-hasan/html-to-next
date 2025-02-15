import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Inter, Noto_Sans, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./StoreProvider";

// Load fonts with desired weights
const inter = Inter({
  subsets: ["latin"],
  weights: ["400", "500", "700", "900"],
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weights: ["400", "500", "700", "900"],
  display: "swap",
});

const workSans = Work_Sans({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${notoSans.className} ${workSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
        <AntdRegistry>{children}</AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
