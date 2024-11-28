import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import CreateEventDrawer from "./components/CreateEvent";
import {ThemeProvider} from "./components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] });

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
  title: "Schedify",
  description: "Meeting Scheduling App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          
            <Header />
            <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
              {children}
            </main>
            <footer className="bg-blue-200 py-12">
              <div className="container mx-auto px-4 text-center text-gray-600">
                <p>Made by Gourav</p>
              </div>
            </footer>
            <CreateEventDrawer />
          
        </body>
      </html>
    </ClerkProvider>
  );
}
