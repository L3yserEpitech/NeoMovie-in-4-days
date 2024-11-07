import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/dataprovider";
import { MediaProvider } from "@/context/mediaprovider";
import LayoutContent from '@/context/progress';; 

export const metadata: Metadata = {
  title: "My Neo Movie",
  description: "Stream movies and series anytime, anywhere !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className="dark bg-background">
      <body className="dark text-foreground">
        <DataProvider>
          <MediaProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </MediaProvider>
        </DataProvider>
      </body>
    </html>
  );
}
