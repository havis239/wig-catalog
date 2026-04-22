"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Clock, Quote } from 'lucide-react';

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-light min-h-[90vh] flex items-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary opacity-20 blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-16 pb-20 lg:pt-0 lg:pb-0">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary text-dark text-sm font-semibold mb-4 tracking-wider">
                #1 WIG STORE IN INDONESIA
              </span>
              <h1 className="text-4xl tracking-tight font-extrabold text-dark sm:text-5xl md:text-6xl lg:leading-tight">
                Tampil Percaya Diri dengan <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Wig Premium</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Temukan koleksi rambut palsu berkualitas tinggi untuk setiap kesempatan. Desain natural, nyaman dipakai, dan meningkatkan rasa percaya diri Anda setiap hari.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <Link href="/catalog" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-dark hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Lihat Katalog
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors">
                  Hubungi Kami
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden aspect-[4/5]">
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary mix-blend-multiply opacity-20"></div>
                <Image
                  className="w-full h-full object-cover"
                  src="http://localhost:5000/brain/hero_wig_model_1776320747990.png"
                  alt="Model wearing premium wig"
                  layout="fill"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="p-6 bg-light rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4">
                <Star className="text-dark h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Kualitas Premium</h3>
              <p className="text-gray-600">Material sintetis dan human hair terbaik yang terlihat 100% natural dan tahan lama.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="p-6 bg-light rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-primary bg-opacity-30 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aman & Nyaman</h3>
              <p className="text-gray-600">Sirkulasi udara yang baik, ringan di kepala, dan tidak menyebabkan iritasi kulit.</p>
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="p-6 bg-light rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-12 h-12 mx-auto bg-accent bg-opacity-30 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600">Proses pemesanan mudah dengan layanan pengiriman instan ke seluruh Indonesia.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories / Banner CTA */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full opacity-10 -mr-20 -mt-20 blur-2xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Siap Mengubah Penampilan Anda?</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Jangan biarkan kebotakan atau sekadar rasa bosan menghalangi Anda tampil ekstra. Konsultasikan kebutuhan Anda bersama tim kami secara gratis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="https://wa.me/6281234567890?text=Halo%20WigCatalog,%20saya%20ingin%20konsultasi%20wig" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-dark bg-secondary hover:bg-white transition-colors transform hover:scale-105 shadow-[0_0_15px_rgba(255,200,221,0.5)]">
              Konsultasi via WhatsApp
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-white border-2 border-white hover:bg-white hover:text-dark transition-all">
              Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Updated) */}
      <section className="py-24 bg-light overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary opacity-20 blur-3xl rounded-full -ml-32 -mt-32"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-4">Testimoni Pelanggan</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Cerita tulus dari mereka yang telah bertransformasi dan menemukan kepercayaan diri kembali bersama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((t, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={t._id} 
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300"
                >
                  <Quote className="absolute top-6 right-8 h-12 w-12 text-secondary opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className={`h-4 w-4 ${index < t.rating ? 'text-accent fill-accent' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-8 relative z-10">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-dark font-bold text-lg overflow-hidden border-2 border-white shadow-sm">
                      {t.image ? (
                        <Image src={t.image} width={48} height={48} alt={t.name} className="object-cover" />
                      ) : (
                        t.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark leading-tight">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Loading/Empty State
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-3xl animate-pulse border border-gray-100">
                  <div className="h-4 w-24 bg-gray-100 rounded mb-4"></div>
                  <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-100 rounded mb-8"></div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-gray-100 rounded mb-2"></div>
                      <div className="h-3 w-16 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
