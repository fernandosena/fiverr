import Footer from "@/components/Footer";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Fiverr",
  description: "Fiverr",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <>
          <div className="relative flex flex-col h-screen justify-between">
            <Navbar />
            <div className={`mb-auto w-full mx-auto`}>{children}</div>
            <Footer />
          </div>
        </>
      </body>
    </html>
  );
}
