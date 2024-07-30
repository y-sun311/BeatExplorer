"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, ...pageProps }) {
  const { session } = pageProps;
  console.log(session);
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <app>
          <SessionProvider session={session}>
            <RecoilRoot>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-grow">
                  {children}
                </div>
              </div>
                <div className="sticky bottom-0">
                  <Player />
                </div>
            </RecoilRoot>
          </SessionProvider>
        </app>
      </body>
    </html>
  );
}
