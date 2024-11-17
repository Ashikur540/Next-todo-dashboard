import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Mona_Sans } from "next/font/google";
import DashboardLayout from "./dashboard/_components/_DashboardLayout";
import ReduxProvider from "./providers";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-monaSans",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Flow Mate Task Management App",
  description:
    "This is a task management app developed by Ashikur Rahman Frontend Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} ${monaSans.variable} antialiased`}>
        <ReduxProvider>
          <DashboardLayout>
            {children}
            <Toaster position="bottom-center" reverseOrder={false} />
          </DashboardLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
