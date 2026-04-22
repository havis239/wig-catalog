import './globals.css';
import StoreProvider from '../components/StoreProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Wig Catalog - Premium Hair Solutions',
  description: 'Temukan berbagai jenis wig berkualitas, dari wig panjang, pendek, hingga custom wig untuk kebutuhan Anda.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="flex flex-col min-h-screen">
        <StoreProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
