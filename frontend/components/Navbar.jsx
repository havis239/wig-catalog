"use client";

import Link from 'next/link';
import { Menu, X, Scissors, LayoutDashboard, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth, logout } from '../store/slices/authSlice';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Scissors className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-dark">WigCatalog</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Beranda</Link>
            <Link href="/catalog" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Katalog</Link>
            <Link href="/services" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Layanan</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Tentang Kami</Link>
            <Link href="/news" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors">Berita</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-100">
                <Link href="/admin/dashboard" className="text-primary hover:text-dark flex items-center gap-1 text-sm font-bold transition-colors">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link href="/contact" className="bg-primary text-white hover:bg-opacity-90 px-4 py-2 rounded-md text-sm font-medium transition-all shadow-md">Hubungi Kami</Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary">Beranda</Link>
            <Link href="/catalog" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary">Katalog</Link>
            <Link href="/services" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary">Layanan</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary">Tentang Kami</Link>
            <Link href="/news" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary">Berita</Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/admin/dashboard" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-primary text-base font-bold text-primary hover:bg-gray-50">Dashboard Admin</Link>
                <button onClick={handleLogout} className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-500 hover:bg-red-50">Logout</button>
              </>
            ) : (
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-primary">Hubungi Kami</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

