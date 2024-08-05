import "./globals.css";

import Header from "@/components/Header";

import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "MediaBlade web",
  author: "Gregory Cabral",
  description: "A simple online video downloader using ytdl-core",
  openGraph: {
    //url: "",
    type: "website",
    title: "MediaBlade web",
    description: "A simple online video downloader using ytdl-core",
    //images: [''],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
