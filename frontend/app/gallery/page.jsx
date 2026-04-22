"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1595475241949-0f021207d57a?q=80&w=600', title: 'Studio Showcase' },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1574621100236-d25b64cfdd63?q=80&w=600', title: 'Premium Collection' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=600', title: 'Hair Styling Process' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600', title: 'Quality Inspection' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=600', title: 'Studio Interior' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1560066914-1f29c2cc7d3a?q=80&w=600', title: 'Client Transformation' },
];

export default function Gallery() {
  return (
    <div className="bg-light min-h-screen">
      {/* Header */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-dark mb-4"
          >
            Galeri Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Lihat berbagai koleksi produk terbaik kami dan aktivitas harian di studio WigCatalog.
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all h-[400px]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-300 text-sm">WigCatalog Quality Preview</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
