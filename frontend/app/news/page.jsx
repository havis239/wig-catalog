"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/slices/articleSlice';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { motion } from 'framer-motion';

export default function News() {
  const dispatch = useDispatch();
  const { articles, loading, error } = useSelector((state) => state.article);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-light min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-dark mb-4">Berita & Inspirasi</h1>
            <p className="text-gray-500 text-lg">
              Temukan tips perawatan wig terbaru, tren gaya rambut, dan update terkini dari WigCatalog.
            </p>
          </div>
          
          <div className="w-full md:w-80">
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-8 rounded-2xl text-center border border-red-100">
            <p className="font-medium">{error}</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <Newspaper className="mx-auto h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">Belum ada artikel</h3>
            <p className="text-gray-500 mt-2">Coba gunakan kata kunci pencarian yang lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles.map((article, index) => (
              <motion.article 
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <Link href={`/news/${article._id}`}>
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={article.thumbnailUrl || 'https://via.placeholder.com/600x400'} 
                      alt={article.title} 
                      layout="fill" 
                      objectFit="cover" 
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                      <Calendar className="h-4 w-4 text-primary" />
                      {new Date(article.createdAt).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                    <h2 className="text-2xl font-bold text-dark mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 line-clamp-3 mb-6 leading-relaxed">
                      {article.content}
                    </p>
                    <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all uppercase text-xs tracking-wider">
                      Baca Selengkapnya
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
