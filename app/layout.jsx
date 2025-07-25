import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";
import "./globals.css";

export const metadata = {
  title: "Birchip",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
