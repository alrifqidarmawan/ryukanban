import { Inter } from "next/font/google";
import "./globals.css";
import { BoardProvider } from "@/context/BoardContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <BoardProvider>{children}</BoardProvider>
            </body>
        </html>
    );
}
