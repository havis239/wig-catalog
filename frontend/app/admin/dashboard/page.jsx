"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchProducts, deleteProduct, createProduct, updateProduct, clearProductError } from '../../../store/slices/productSlice';
import { fetchArticles, deleteArticle, createArticle, updateArticle, clearArticleError } from '../../../store/slices/articleSlice';
import { fetchInquiries, deleteInquiry } from '../../../store/slices/inquirySlice';
import { logout, checkAuth } from '../../../store/slices/authSlice';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Package, 
  Newspaper, 
  LogOut, 
  LayoutDashboard, 
  X,
  Upload,
  MessageSquare,
  Eye
} from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useSelector((state) => state.auth);
  const { products, loading: productsLoading } = useSelector((state) => state.product);
  const { articles, loading: articlesLoading } = useSelector((state) => state.article);
  const { inquiries, loading: inquiriesLoading } = useSelector((state) => state.inquiry);

  const [activeTab, setActiveTab] = useState('products');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProducts());
      dispatch(fetchArticles());
      dispatch(fetchInquiries());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/admin/login');
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(activeTab === 'products' 
        ? { name: item.name, description: item.description, price: item.price, category: item.category }
        : { title: item.title, content: item.content }
      );
    } else {
      setEditingItem(null);
      setFormData(activeTab === 'products'
        ? { name: '', description: '', price: '', category: 'wig pendek' }
        : { title: '', content: '' }
      );
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
    setFile(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
    
    if (file) {
      if (activeTab === 'products') {
        submitData.append('image', file);
      } else {
        submitData.append('thumbnail', file);
      }
    }

    if (activeTab === 'products') {
      if (editingItem) {
        await dispatch(updateProduct({ id: editingItem._id, formData: submitData }));
      } else {
        await dispatch(createProduct(submitData));
      }
    } else {
      if (editingItem) {
        await dispatch(updateArticle({ id: editingItem._id, formData: submitData }));
      } else {
        await dispatch(createArticle(submitData));
      }
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      if (activeTab === 'products') {
        dispatch(deleteProduct(id));
      } else if (activeTab === 'articles') {
        dispatch(deleteArticle(id));
      } else {
        dispatch(deleteInquiry(id));
      }
    }
  };

  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 py-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            <Package className="h-5 w-5" />
            Produk
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'articles' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            <Newspaper className="h-5 w-5" />
            Berita
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-primary text-white' : 'hover:bg-gray-800 text-gray-400'}`}
          >
            <MessageSquare className="h-5 w-5" />
            Pesan
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-dark capitalize">
            Kelola {activeTab === 'products' ? 'Produk' : activeTab === 'articles' ? 'Berita' : 'Pesan Pelanggan'}
          </h1>
          {activeTab !== 'messages' && (
            <button
              onClick={() => openModal()}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md shadow-primary/20"
            >
              <Plus className="h-5 w-5" />
              Tambah {activeTab === 'products' ? 'Produk' : 'Berita'}
            </button>
          )}
        </header>

        {/* Content Table/Grid */}
        {(activeTab === 'products' ? productsLoading : articlesLoading) ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-xl shadow-sm border border-gray-100"></div>)}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left truncate">
              <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
                <tr>
                  {activeTab !== 'messages' ? (
                    <>
                      <th className="px-6 py-4">Gambar</th>
                      <th className="px-6 py-4">{activeTab === 'products' ? 'Nama Produk' : 'Judul Berita'}</th>
                      <th className="px-6 py-4">{activeTab === 'products' ? 'Kategori' : 'Tanggal'}</th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-4">Pengirim</th>
                      <th className="px-6 py-4">Subjek</th>
                      <th className="px-6 py-4">Tanggal</th>
                    </>
                  )}
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(activeTab === 'products' ? products : activeTab === 'articles' ? articles : inquiries).map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    {activeTab !== 'messages' ? (
                      <>
                        <td className="px-6 py-4">
                          <div className="h-12 w-12 relative rounded overflow-hidden">
                            <Image 
                              src={(activeTab === 'products' ? item.imageUrl : item.thumbnailUrl) || 'https://via.placeholder.com/100'} 
                              alt="thumbnail" 
                              layout="fill" 
                              objectFit="cover" 
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {activeTab === 'products' ? item.name : item.title}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {activeTab === 'products' 
                            ? <span className="px-2 py-1 bg-gray-100 rounded text-xs capitalize">{item.category}</span>
                            : new Date(item.createdAt).toLocaleDateString()
                          }
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-dark">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.email}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {item.subject}
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {activeTab === 'messages' ? (
                          <button
                            onClick={() => setViewingMessage(item)}
                            className="p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => openModal(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-dark">
                {editingItem ? 'Edit' : 'Tambah'} {activeTab === 'products' ? 'Produk' : 'Berita'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {activeTab === 'products' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                      <input
                        type="number"
                        name="price"
                        required
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                      <select
                        name="category"
                        value={formData.category || 'wig pendek'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      >
                        <option value="wig pendek">Wig Pendek</option>
                        <option value="wig panjang">Wig Panjang</option>
                        <option value="wig curly">Wig Curly</option>
                        <option value="custom wig">Custom Wig</option>
                        <option value="lainnya">Lainnya</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                    <textarea
                      name="description"
                      rows="3"
                      required
                      value={formData.description || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
                    <textarea
                      name="content"
                      rows="6"
                      required
                      value={formData.content || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    ></textarea>
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary transition-colors cursor-pointer relative">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-opacity-80">
                        Upload a file
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WebP up to 5MB</p>
                    {file && <p className="text-xs text-green-600 font-bold">{file.name}</p>}
                  </div>
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-bold"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Viewing Message Modal */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-dark">Detail Pesan</h3>
              <button onClick={() => setViewingMessage(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold mb-1">Pengirim</div>
                  <div className="font-bold text-dark">{viewingMessage.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold mb-1">Tanggal</div>
                  <div className="text-dark">{new Date(viewingMessage.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold mb-1">Email</div>
                  <div className="text-dark">{viewingMessage.email}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold mb-1">Telepon</div>
                  <div className="text-dark">{viewingMessage.phone}</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Subjek</div>
                <div className="text-dark font-bold">{viewingMessage.subject}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Isi Pesan</div>
                <div className="bg-gray-50 p-4 rounded-xl text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {viewingMessage.message}
                </div>
              </div>
              <button
                onClick={() => setViewingMessage(null)}
                className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
