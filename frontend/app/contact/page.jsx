"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitInquiry, resetInquiryStatus } from '../../store/slices/inquirySlice';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send,
  CheckCircle,
  Instagram,
  Facebook
} from 'lucide-react';

export default function Contact() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.inquiry);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Konsultasi Wig',
    message: ''
  });

  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Konsultasi Wig',
        message: ''
      });
      // Optionally reset success status after a few seconds or when leaving page
    }
  }, [success]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit attempt started...");
    dispatch(submitInquiry(formData));
  };

  const handleReset = () => {
    dispatch(resetInquiryStatus());
  };

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
            Hubungi Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto"
          >
            Punya pertanyaan atau ingin melakukan konsultasi? Kami siap membantu Anda kapan saja.
          </motion.p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                <h3 className="text-xl font-bold text-dark mb-8 flex items-center gap-2">
                  Informasi Kontak
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">Telepon / WhatsApp</div>
                      <div className="text-dark font-bold">+62 812 3456 7890</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">Email</div>
                      <div className="text-dark font-bold">hello@wigcatalog.id</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">Studio Kami</div>
                      <div className="text-dark font-bold">
                        Karangbanjar RT14/05, <br />
                        Purbalingga, Jawa Tengah, 53361
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">Jam Operasional</div>
                      <div className="text-dark font-bold">Senin - Sabtu: 09.00 - 18.00</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-gray-100">
                  <div className="text-sm text-gray-400 font-medium mb-4 uppercase tracking-wider">Follow Media Sosial</div>
                  <div className="flex gap-4">
                    <a href="#" className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a href="#" className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="bg-emerald-500 p-8 rounded-2xl shadow-xl shadow-emerald-500/20 text-white">
                <MessageCircle className="h-10 w-10 mb-4" />
                <h3 className="text-xl font-bold mb-2">Pesan via WhatsApp</h3>
                <p className="text-emerald-50 mb-6 font-medium">Ingin respon yang lebih cepat? Hubungi kami langsung melalui WhatsApp untuk konsultasi instan.</p>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-lg"
                >
                  Buka WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-50">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center"
                  >
                    <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8">
                      <CheckCircle className="h-12 w-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-dark mb-4">Pesan Anda Terkirim!</h2>
                    <p className="text-gray-500 text-lg max-w-md mx-auto mb-10">
                      Terima kasih telah menghubungi kami. Tim kami akan segera merespon pesan Anda melalui email atau telepon.
                    </p>
                    <button 
                      onClick={handleReset}
                      className="text-primary font-bold hover:underline"
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-3xl font-extrabold text-dark mb-4">Kirim Pesan</h2>
                    <p className="text-gray-500 mb-10 text-lg">Gunakan formulir di bawah ini untuk mengirimkan pertanyaan atau permintaan khusus.</p>
                    
                    {error && (
                      <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 border border-red-100 italic text-sm">
                        Maaf, terjadi kesalahan: {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-dark mb-2">Nama Lengkap</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-dark mb-2">Alamat Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-dark mb-2">No. Telepon / WhatsApp</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                            placeholder="+62 8..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-dark mb-2">Subjek</label>
                          <select 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none appearance-none"
                          >
                            <option value="Konsultasi Wig">Konsultasi Wig</option>
                            <option value="Pemesanan Khusus">Pemesanan Khusus</option>
                            <option value="Informasi Produk">Informasi Produk</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-dark mb-2">Pesan Anda</label>
                        <textarea
                          rows="6"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                          placeholder="Tuliskan pesan atau detail kebutuhan Anda di sini..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-primary text-white py-5 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                        {loading ? (
                          <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            Kirim Pesan Sekarang
                            <Send className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
