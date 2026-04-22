"use client";

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';
import { fetchArticleById } from '../../../store/slices/articleSlice';
import Image from 'next/image';
import { Calendar, ChevronLeft, User, Share2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ArticleDetail() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentArticle, loading, error } = useSelector((state) => state.article);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-dark mb-4">Artikel Tidak Ditemukan</h2>
        <Link href="/news" className="text-primary font-bold hover:underline">Kembali ke Berita</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 font-medium"
        >
          <ChevronLeft className="h-5 w-5" />
          Kembali
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Inspirasi
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="h-4 w-4" />
              {new Date(currentArticle.createdAt).toLocaleDateString('id-ID', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-dark mb-8 leading-tight">
            {currentArticle.title}
          </h1>

          <div className="flex items-center justify-between border-y border-gray-100 py-6 mb-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-dark">Admin WigCatalog</div>
                <div className="text-xs text-gray-500">Editor & Stylist</div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Image */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-gray-200"
        >
          <Image 
            src={currentArticle.thumbnailUrl || 'https://via.placeholder.com/1200x800'} 
            alt={currentArticle.title} 
            layout="fill" 
            objectFit="cover" 
          />
        </motion.div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4">
        <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-loose">
          {currentArticle.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
        
        <div className="mt-20 p-10 bg-gray-50 rounded-3xl border border-gray-100 text-center">
          <h3 className="text-xl font-bold text-dark mb-4">Butuh Rekomendasi Wig?</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Tim ahli kami siap membantu Anda memilih wig yang paling tepat untuk kebutuhan Anda.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-dark text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-all shadow-xl shadow-gray-200"
          >
            Hubungi Konsultan Kami
          </Link>
        </div>
      </article>
    </div>
  );
}
