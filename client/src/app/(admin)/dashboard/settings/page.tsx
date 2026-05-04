'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Wand2, 
  Globe, 
  Shield, 
  Save,
  Mail,
  Smartphone,
  CheckCircle2,
  Key,
  Palette,
  Layout,
  Cpu,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Profile State
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    status: ''
  });

  // Password State
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Studio Config State
  const [studioConfig, setStudioConfig] = useState({
    defaultStyle: 'Photorealistic',
    defaultFormat: 'PNG',
    autoUpscale: true,
    saveToLibrary: true,
    aiPostProcess: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile({
          name: data.name || '',
          email: data.email || '',
          role: data.role || '',
          status: data.status || ''
        });

        setStudioConfig({
          defaultStyle: data.defaultStyle || 'Photorealistic',
          defaultFormat: data.defaultFormat || 'PNG',
          autoUpscale: data.autoUpscale ?? true,
          saveToLibrary: data.saveToLibrary ?? true,
          aiPostProcess: data.aiPostProcess ?? false
        });
      } catch (err: any) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      const token = localStorage.getItem('token');

      if (activeTab === 'general') {
        const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update profile');
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          localStorage.setItem('user', JSON.stringify({ ...user, name: data.user.name, email: data.user.email }));
        }
      } else if (activeTab === 'studio') {
        const response = await fetch(`${API_BASE_URL}/auth/update-studio-config`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(studioConfig)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to update studio configuration');
        }
      } else if (activeTab === 'security') {
        if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
          throw new Error('All password fields are required');
        }

        if (passwords.newPassword !== passwords.confirmPassword) {
          throw new Error('New passwords do not match');
        }

        const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(passwords)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to change password');
        }

        // Clear password fields on success
        setPasswords({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        // For other tabs, just show success for now
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  const sections = [
    { id: 'general', label: 'Profile', icon: User },
    { id: 'studio', label: 'Studio Config', icon: Palette },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account, studio preferences, and AI configurations</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/25 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3"
          >
            <CheckCircle2 size={20} />
            <p className="text-sm font-bold uppercase tracking-wide">Settings updated successfully!</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl flex items-center gap-3"
          >
            <AlertCircle size={20} />
            <p className="text-sm font-bold uppercase tracking-wide">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Tabs */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap border-l-4 ${
                  activeTab === section.id 
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-500 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 border-transparent hover:text-slate-700'
                }`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                <p className="text-slate-500 font-medium">Loading your settings...</p>
              </div>
            ) : (
              <>
                {activeTab === 'general' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                      <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Public profile and account details</p>
                    </div>
                    <div className="p-6 space-y-8">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-400 relative group cursor-pointer shadow-sm">
                          <User size={40} />
                          <div className="absolute inset-0 bg-indigo-900/60 text-white opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity flex items-center justify-center">
                            <Palette size={20} />
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="font-bold text-slate-900">Studio Avatar</h3>
                          <p className="text-xs text-slate-500 mt-1">Recommended: Square image, max 2MB.</p>
                          <button className="mt-3 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-colors uppercase tracking-widest">Upload New</button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                          <input 
                            type="text" 
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            placeholder="Your Name"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                          <input 
                            type="email" 
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-900"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Role</label>
                          <input 
                            type="text" 
                            value={profile.role}
                            disabled
                            className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</label>
                          <input 
                            type="text" 
                            value={profile.status}
                            disabled
                            className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'studio' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                      <h2 className="text-lg font-bold text-slate-900">Studio Configuration</h2>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Default AI styles and output settings</p>
                    </div>
                    <div className="p-6 space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Default Generation Style</label>
                          <select 
                            value={studioConfig.defaultStyle}
                            onChange={(e) => setStudioConfig({ ...studioConfig, defaultStyle: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700"
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
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Output Format</label>
                          <select 
                            value={studioConfig.defaultFormat}
                            onChange={(e) => setStudioConfig({ ...studioConfig, defaultFormat: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700"
                          >
                            <option>PNG</option>
                            <option>JPG</option>
                            <option>WEBP</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Creative Workflow</h3>
                        <div className="space-y-3">
                          {[
                            { id: 'autoUpscale', title: 'Auto-upscale generations', checked: studioConfig.autoUpscale },
                            { id: 'saveToLibrary', title: 'Save prompts to library', checked: studioConfig.saveToLibrary },
                            { id: 'aiPostProcess', title: 'Post-process with AI filters', checked: studioConfig.aiPostProcess },
                          ].map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl hover:border-indigo-100 transition-all">
                              <span className="text-sm font-semibold text-slate-700">{item.title}</span>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={item.checked} 
                                  onChange={(e) => setStudioConfig({ ...studioConfig, [item.id]: e.target.checked })}
                                  className="sr-only peer" 
                                />
                                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-500"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                      <h2 className="text-lg font-bold text-slate-900">Security Settings</h2>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Manage passwords and authentication</p>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
                          <input 
                            type="password" 
                            value={passwords.currentPassword}
                            onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            placeholder="••••••••••••"
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                            <input 
                              type="password" 
                              value={passwords.newPassword}
                              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                              placeholder="New password"
                              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
                            <input 
                              type="password" 
                              value={passwords.confirmPassword}
                              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                              placeholder="Confirm new password"
                              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
