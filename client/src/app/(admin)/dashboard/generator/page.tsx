'use client';

import React, { useState, useEffect } from 'react';
import { Wand2, Image as ImageIcon, Sparkles, Send, Download, Share2, Trash2, Loader2, ChevronLeft, ChevronRight, Layers, FileImage } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';

export default function GeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState('1:1');
  const [selectedStyle, setSelectedStyle] = useState('Photorealistic');
  const [selectedFormat, setSelectedFormat] = useState('PNG');
  const [generationType, setGenerationType] = useState('single');
  const [numSlides, setNumSlides] = useState(3);
  const [generatedImages, setGeneratedImages] = useState<{id: number, url: string, prompt: string}[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.defaultStyle) setSelectedStyle(data.defaultStyle);
          if (data.defaultFormat) setSelectedFormat(data.defaultFormat);
        }
      } catch (err) {
        console.error('Failed to fetch preferences:', err);
      }
    };

    fetchPreferences();
  }, []);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    try {
      setIsGenerating(true);
      setError(null);
      setGeneratedImages([]);
      setCurrentSlideIndex(0);
      
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/generator/generate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
          aspectRatio: selectedRatio,
          format: selectedFormat,
          generationType,
          numSlides: generationType === 'carousel' ? numSlides : 1
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate image');
      }
      
      const data = await response.json();
      setGeneratedImages(data.images || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % generatedImages.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + generatedImages.length) % generatedImages.length);
  };

  const handleDownload = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `ai-generation-${Date.now()}-${index + 1}.${selectedFormat.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Image Generator</h2>
        <p className="text-slate-500 mt-2 font-medium">Transform your ideas into high-quality visual content or cohesive carousel ads.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Content Format</label>
              <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-200">
                <button 
                  onClick={() => setGenerationType('single')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${generationType === 'single' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <FileImage size={14} />
                  Single Image
                </button>
                <button 
                  onClick={() => setGenerationType('carousel')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${generationType === 'carousel' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <Layers size={14} />
                  Carousel Ad
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Describe your vision</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={generationType === 'carousel' ? "Describe the overall story or product for your carousel..." : "A futuristic city with neon lights..."}
                className="w-full h-32 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-sm font-medium leading-relaxed"
              />
            </div>
            
            <div className="space-y-6">
              {generationType === 'carousel' && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Number of Slides</label>
                  <div className="flex gap-2">
                    {[2, 3, 4, 5, 6].map((num) => (
                      <button
                        key={num}
                        onClick={() => setNumSlides(num)}
                        className={`flex-1 py-2.5 border rounded-xl text-xs font-bold transition-all ${
                          numSlides === num
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Artistic Style</label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                >
                  <option>Photorealistic</option>
                  <option>Cinematic</option>
                  <option>Ad Creative</option>
                  <option>Digital Art</option>
                  <option>3D Render</option>
                  <option>Cyberpunk</option>
                  <option>Minimalist</option>
                  <option>Oil Painting</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Aspect Ratio</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: '1:1', ratio: '1/1' },
                    { label: '16:9', ratio: '16/9' },
                    { label: '9:16', ratio: '9/16' },
                    { label: '3:4', ratio: '3/4' },
                    { label: '4:3', ratio: '4/3' },
                    { label: '3:2', ratio: '3/2' },
                    { label: '2:3', ratio: '2/3' },
                    { label: '5:4', ratio: '5/4' },
                    { label: '4:5', ratio: '4/5' },
                    { label: '21:9', ratio: '21/9' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setSelectedRatio(item.label)}
                      className={`py-2 px-1 border rounded-xl flex flex-col items-center gap-1.5 transition-all ${
                        selectedRatio === item.label
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div 
                          className={`rounded-[2px] border-2 ${
                            selectedRatio === item.label ? 'border-white' : 'border-slate-300'
                          }`}
                          style={{ 
                            aspectRatio: item.ratio,
                            width: parseFloat(item.label.split(':')[0]) >= parseFloat(item.label.split(':')[1]) ? '100%' : 'auto',
                            height: parseFloat(item.label.split(':')[1]) >= parseFloat(item.label.split(':')[0]) ? '100%' : 'auto',
                            maxHeight: '100%',
                            maxWidth: '100%'
                          }}
                        />
                      </div>
                      <span className="text-[9px] font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                isGenerating || !prompt 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-500/30 active:scale-[0.98]'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating {generationType === 'carousel' ? 'Carousel' : 'Image'}...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate {generationType === 'carousel' ? 'Carousel' : 'Image'}
                </>
              )}
            </button>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3"
                >
                  <div className="mt-0.5 p-1 bg-rose-100 rounded-md text-rose-600">
                    <Trash2 size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Error Occurred</p>
                    <p className="text-sm text-rose-600/80 font-medium mt-1 leading-relaxed">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 h-[700px] flex flex-col items-center justify-center relative overflow-hidden group">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-indigo-50 border-t-indigo-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-indigo-600 animate-pulse" size={24} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-slate-900 font-bold text-lg">Generating {generationType === 'carousel' ? 'Carousel' : 'Masterpiece'}</p>
                  <p className="text-slate-400 font-medium text-sm mt-1 animate-pulse">Our AI is processing your request...</p>
                </div>
              </div>
            ) : generatedImages.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full p-4 flex flex-col"
              >
                <div className="relative flex-1 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 group/slide">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentSlideIndex}
                      src={generatedImages[currentSlideIndex].url} 
                      alt={`Slide ${currentSlideIndex + 1}`} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>
                  
                  {generatedImages.length > 1 && (
                    <>
                      <button 
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg text-slate-700 hover:text-indigo-600 transition-all z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button 
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg text-slate-700 hover:text-indigo-600 transition-all z-10"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/20 backdrop-blur-md rounded-full">
                        {generatedImages.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`h-1.5 rounded-full transition-all ${idx === currentSlideIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Actions Overlay */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 group-hover/slide:opacity-100 transition-all duration-300 translate-y-4 group-hover/slide:translate-y-0 z-20">
                    <button 
                      onClick={() => handleDownload(generatedImages[currentSlideIndex].url, currentSlideIndex)}
                      className="flex items-center gap-2 px-6 py-3.5 bg-white shadow-2xl rounded-2xl text-slate-700 hover:text-indigo-600 font-bold text-sm transition-all hover:scale-105"
                    >
                      <Download size={18} />
                      Download Slide
                    </button>
                    <button className="p-3.5 bg-white shadow-2xl rounded-2xl text-slate-700 hover:text-indigo-600 transition-all hover:scale-105">
                      <Share2 size={20} />
                    </button>
                    <button 
                      onClick={() => setGeneratedImages([])}
                      className="p-3.5 bg-white shadow-2xl rounded-2xl text-rose-600 hover:bg-rose-50 transition-all hover:scale-105"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Slide {currentSlideIndex + 1} Prompt</p>
                  <p className="text-xs text-slate-600 font-medium line-clamp-2 italic">"{generatedImages[currentSlideIndex].prompt}"</p>
                </div>
              </motion.div>
            ) : (
              <div className="text-center space-y-6 max-w-sm px-8">
                <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto border border-slate-100 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <ImageIcon size={40} className="text-slate-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Ready to create?</h3>
                  <p className="text-slate-400 font-medium text-sm mt-2 leading-relaxed">
                    Choose between a single image or a cohesive {numSlides}-slide carousel for your next campaign.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Carousel Ad', 'Photorealistic', 'High Conversion'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Background Grain/Noise for texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
