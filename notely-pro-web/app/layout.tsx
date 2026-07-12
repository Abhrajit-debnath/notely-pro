import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "./theme";
import "./globals.css";
import QueryProvider from "@/components/providers/queryClient/QueryProvider";
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notely Pro - Collaborative Note Sharing",
  description: "Real-time, collaborative note taking and sharing platform.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            <Notifications position="top-center" />
            {children}
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
