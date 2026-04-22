"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 opacity-40">
           <Image 
            src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=1200" 
            alt="Studio Background" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
          >
            Tentang Kami
          </motion.h1>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-dark mb-6">Dedikasi Untuk Kecantikan Anda Sejak 2015</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                WigCatalog dimulai dari sebuah visi sederhana: memberikan kepercayaan diri kembali kepada setiap orang melalui keindahan rambut yang natural. Kami memahami bahwa rambut adalah mahkota bagi setiap insan.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hingga kini, kami telah membantu ribuan pelanggan menemukan gaya rambut impian mereka dengan koleksi wig berkualitas premium yang dibuat dengan standar estetika tertinggi.
              </p>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-dark text-lg">Premium Quality</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-dark text-lg">Natural Look</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-dark text-lg">Expert Styling</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <span className="font-semibold text-dark text-lg">Best Support</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
            >
              <Image 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop" 
                alt="Wig Salon" 
                layout="fill" 
                objectFit="cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Visi & Misi Kami</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Kami terus berinovasi untuk memberikan yang terbaik bagi pelanggan kami.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                < Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Visi Kami</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Menjadi pusat solusi gaya rambut wig terdepan di Indonesia yang menginspirasi kepercayaan diri melalui produk berkualitas tinggi dan pelayanan yang personal.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                < Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-dark mb-4">Misi Kami</h3>
              <ul className="space-y-4 text-gray-600 text-lg">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                  Menyediakan berbagai macam koleksi wig dengan standar internasional.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                  Memberikan layanan konsultasi rambut yang komprehensif.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
                  Edukasi berkelanjutan tentang perawatan wig bagi pengguna.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section (Replaced Stats) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark mb-4">Lokasi Studio Kami</h2>
            <p className="text-gray-500 max-w-2xl mx-auto flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Karangbanjar RT14/05, Purbalingga, Jawa Tengah, Indonesia, 53361
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white shadow-primary/5"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.428481432!2d109.34!3d-7.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e65597b819f727d%3A0x4027a76e35320c0!2sKarangbanjar%2C%20Kec.%20Bojongsari%2C%20Kabupaten%20Purbalingga%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1713854123456!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
