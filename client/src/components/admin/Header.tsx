'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, Menu, LogOut, Settings, UserCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<{name?: string, email?: string, role?: string} | null>(null);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Close dropdown on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="h-[72px] flex-shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 sm:gap-5 flex-1">
        <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg shrink-0">
          <Menu size={20} />
        </button>
        <div className="relative max-w-lg w-full hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search campaigns, creatives..."
            className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="p-2 sm:p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl relative transition-colors shrink-0">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-9 w-px bg-slate-200 mx-1 hidden sm:block"></div>
        
        {/* Profile Section with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 sm:gap-4 pl-0 sm:pl-2 group"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                {user?.name || 'Studio Manager'}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5">
                {user?.role || 'Admin'}
              </p>
            </div>
            <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-100 border ${isProfileOpen ? 'border-indigo-500 ring-2 ring-indigo-500/10' : 'border-slate-200'} flex items-center justify-center text-slate-600 overflow-hidden cursor-pointer group-hover:border-indigo-500 transition-all shrink-0`}>
              {user?.name ? (
                <span className="text-xs font-black uppercase text-slate-500 group-hover:text-indigo-600">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              ) : (
                <User size={20} />
              )}
            </div>
            <ChevronDown size={14} className={`text-slate-400 group-hover:text-slate-600 transition-transform hidden sm:block ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-64 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden py-2 z-50"
              >
                {/* User Info Header */}
                <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/50 mb-2">
                  <p className="text-sm font-bold text-slate-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-slate-500 font-medium truncate">{user?.email}</p>
                </div>

                <div className="px-2 space-y-0.5">
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all group"
                  >
                    <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <UserCircle size={16} />
                    </div>
                    My Profile
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl transition-all group"
                  >
                    <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <Settings size={16} />
                    </div>
                    Account Settings
                  </Link>
                </div>

                <div className="mt-2 px-2 pt-2 border-t border-slate-50">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all group"
                  >
                    <div className="p-2 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition-colors">
                      <LogOut size={16} />
                    </div>
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
