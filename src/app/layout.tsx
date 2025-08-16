import { Amatic_SC, Nunito_Sans, Nunito } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
              className={`
            ${nunitoSans.className} ${nunito.className}
            antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
