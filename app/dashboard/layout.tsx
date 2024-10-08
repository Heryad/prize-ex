import BottomBar from "@/components/BottomBar";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
            <body>
                <main className="flex flex-col h-screen bg-gray-200">
                    {children}
                    <BottomBar />
                </main>
            </body>
    );
}
