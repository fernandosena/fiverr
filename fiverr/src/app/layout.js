import Footer from "@/components/Footer";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import AppContext from "./_app";

export const metadata = {
  title: "Fiverr",
  description: "Fiverr",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <AppContext>{children}</AppContext>
      </body>
    </html>
  );
}
