"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../../store/slices/productSlice';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Truck, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetail({ params }) {
  const { id } = params;
  const dispatch = useDispatch();
  const { currentProduct: product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Produk tidak ditemukan</h2>
        <p className="text-gray-500 mb-6">Maaf, produk yang Anda cari tidak tersedia atau terjadi kesalahan.</p>
        <Link href="/catalog" className="text-primary font-medium hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const formatWhatsAppMessage = () => {
    const message = `Halo WigCatalog, saya tertarik untuk memesan produk ini:\n\n*${product.name}*\nHarga: Rp ${product.price.toLocaleString('id-ID')}\nKategori: ${product.category}\nLink: ${typeof window !== 'undefined' ? window.location.href : ''}\n\nApakah stoknya masih tersedia?`;
    return encodeURIComponent(message);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/catalog" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Katalog
        </Link>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 lg:mb-0"
          >
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src={product.imageUrl || 'https://via.placeholder.com/600x800?text=No+Image'}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Gallery thumbnails could go here if we expand the model */}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <span className="inline-block py-1 px-3 rounded text-xs font-semibold bg-gray-100 text-gray-600 capitalize">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(Top Review)</span>
            </div>

            <div className="text-3xl font-bold text-primary mb-6">
              Rp {product.price.toLocaleString('id-ID')}
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
              <p className="whitespace-pre-line">{product.description}</p>
            </div>

            {/* Features summary */}
            <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-gray-100">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-5 w-5 text-gray-400 mr-2" />
                Pengiriman ke Seluruh ID
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-gray-400 mr-2" />
                Garansi Kualitas 100%
              </div>
            </div>

            <div className="mt-auto">
              <a 
                href={`https://wa.me/6281234567890?text=${formatWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#25D366] hover:bg-[#1ebe5d] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <MessageCircle className="h-6 w-6 mr-2" />
                Pesan via WhatsApp
              </a>
              <p className="text-center text-xs text-gray-400 mt-4">
                Tim admin kami akan segera membalas pesan Anda di jam kerja (09.00 - 17.00).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
