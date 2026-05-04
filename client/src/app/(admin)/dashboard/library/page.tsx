'use client';

import React, { useEffect, useState } from 'react';
import { Search, Filter, Grid, List, Download, Share2, MoreVertical, Loader2, ImagePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';

interface Image {
  id: number;
  url: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  format: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

export default function LibraryPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('All Styles');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  const handleDownload = async (url: string, prompt: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      // Use prompt slug as filename
      const fileName = prompt.slice(0, 20).replace(/\s+/g, '-').toLowerCase();
      link.download = `ai-library-${fileName}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/generator/images`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
          return;
        }

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to fetch images');
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [router]);

  const filteredImages = images.filter(image => {
    const matchesSearch = (image.prompt || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (image.user?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = selectedStyle === 'All Styles' || image.style === selectedStyle;
    return matchesSearch && matchesStyle;
  });

  const uniqueStyles = ['All Styles', ...Array.from(new Set(images.map(img => img.style).filter(Boolean)))];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Creative Library</h2>
          <p className="text-slate-500 mt-2">Manage and organize all AI-generated assets.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-xl transition-all ${
              viewMode === 'grid' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Grid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-xl transition-all ${
              viewMode === 'list' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by prompt or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {uniqueStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <button className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2">
              <Filter size={18} />
              Filters
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-medium">Loading your masterpiece collection...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center">
          <p className="text-rose-600 font-bold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white border border-slate-200 border-dashed rounded-3xl py-20 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
            <ImagePlus className="text-indigo-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Your library is empty</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            You haven't generated any images yet. Start your creative journey by generating your first AI masterpiece!
          </p>
          <Link 
            href="/dashboard/generator"
            className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
          >
            Go to Generator
          </Link>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-3xl py-20 text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
            <Search className="text-slate-300" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching images</h3>
          <p className="text-slate-500 mt-1 max-w-xs mx-auto">We couldn't find any images matching your current filters or search query.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedStyle('All Styles');}}
            className="mt-4 text-indigo-600 font-bold hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <img src={image.url} alt={image.prompt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => handleDownload(image.url, image.prompt)}
                    className="p-2 bg-white rounded-lg text-slate-700 hover:text-indigo-600 transition-colors"
                  >
                    <Download size={18} />
                  </button>
                  <button className="p-2 bg-white rounded-lg text-slate-700 hover:text-indigo-600 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm truncate" title={image.prompt}>{image.prompt}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{image.style || 'None'}</span>
                      <span className="text-[10px] font-medium text-slate-400">{new Date(image.createdAt).toLocaleDateString()}</span>
                    </div>
                    {image.user && (
                      <p className="text-[10px] text-slate-500 mt-2 font-medium">By: {image.user.name || image.user.email}</p>
                    )}
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 ml-2">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preview</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prompt Details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Style</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Author</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredImages.map((image) => (
                  <tr key={image.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img src={image.url} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900 max-w-xs truncate" title={image.prompt}>{image.prompt}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{image.aspectRatio} • {image.format}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {image.style || 'None'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-medium text-slate-600">{new Date(image.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-700">{image.user?.name || 'Anonymous'}</p>
                      <p className="text-[10px] text-slate-400">{image.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleDownload(image.url, image.prompt)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="Download"
                        >
                          <Download size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Share">
                          <Share2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
