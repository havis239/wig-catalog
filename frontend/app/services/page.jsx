"use client";

import { Scissors, Ruler, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: 'Konsultasi Eksklusif',
    description: 'Tim ahli kami akan membantu Anda memilih wig yang paling sesuai dengan bentuk wajah, warna kulit, dan gaya hidup Anda.',
    icon: Sparkles,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    title: 'Custom Wig Design',
    description: 'Kami membuat wig khusus yang disesuaikan dengan ukuran kepala dan keinginan spesifik Anda untuk hasil yang paling natural.',
    icon: Ruler,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Styling & Cutting',
    description: 'Layanan penataan dan pemotongan wig oleh hair stylist profesional untuk menciptakan tampilan yang unik dan personal.',
    icon: Scissors,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Perawatan & Cuci',
    description: 'Layanan pembersihan dan perawatan mendalam untuk memastikan wig Anda tetap lembut, berkilau, dan tahan lama.',
    icon: Heart,
    color: 'bg-red-100 text-red-600'
  }
];

export default function Services() {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-dark mb-6"
          >
            Layanan Profesional Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Lebih dari sekadar menjual wig, kami berdedikasi untuk memberikan solusi kecantikan rambut yang lengkap dan terpercaya bagi setiap pelanggan.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 flex gap-6 hover:shadow-xl transition-all group"
              >
                <div className={`flex-shrink-0 w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Siap Untuk Tampilan Baru?</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
            Hubungi kami hari ini untuk konsultasi gratis atau kunjungi studio kami untuk mencoba koleksi terbaru kami.
          </p>
          <button className="bg-primary hover:bg-opacity-90 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg shadow-primary/20">
            Jadwalkan Konsultasi
          </button>
        </div>
      </section>
    </div>
  );
}
