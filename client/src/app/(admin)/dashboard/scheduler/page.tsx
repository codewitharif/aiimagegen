'use client';

import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Share2, Camera, X, Globe, Clock } from 'lucide-react';

const scheduledPosts = [
  { id: 1, platform: 'Facebook', time: '09:00 AM', title: 'Summer Campaign Launch', status: 'Scheduled' },
  { id: 2, platform: 'Instagram', time: '11:30 AM', title: 'Product Showcase - AI Art', status: 'Draft' },
  { id: 3, platform: 'Twitter', time: '02:00 PM', title: 'Industry Trends Discussion', status: 'Scheduled' },
];

export default function SchedulerPage() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Post Scheduler</h2>
          <p className="text-slate-500 mt-2">Plan and automate your social media presence.</p>
        </div>
        
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
          <Plus size={20} />
          Schedule New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-slate-900">March 2024</h3>
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  <button className="p-1.5 hover:bg-white rounded-md transition-colors text-slate-600"><ChevronLeft size={18} /></button>
                  <button className="p-1.5 hover:bg-white rounded-md transition-colors text-slate-600"><ChevronRight size={18} /></button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg">Month</button>
                <button className="px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-50 rounded-lg">Week</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {days.map(day => (
                <div key={day} className="bg-slate-50 p-4 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{day}</span>
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 3; // Mocking start of month
                const isToday = dayNum === 20;
                const hasPost = [15, 18, 20, 22, 25].includes(dayNum);
                
                return (
                  <div key={i} className={`bg-white min-h-[120px] p-2 hover:bg-slate-50 transition-colors cursor-pointer group`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${dayNum > 0 && dayNum <= 31 ? (isToday ? 'text-white bg-indigo-600 w-7 h-7 flex items-center justify-center rounded-full' : 'text-slate-700') : 'text-slate-200'}`}>
                        {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
                      </span>
                      {hasPost && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                    </div>
                    {dayNum === 20 && (
                      <div className="mt-2 space-y-1">
                        <div className="text-[10px] bg-indigo-50 text-indigo-600 p-1.5 rounded-lg font-bold truncate">IG: Launch Post</div>
                        <div className="text-[10px] bg-emerald-50 text-emerald-600 p-1.5 rounded-lg font-bold truncate">FB: Campaign</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar / Queue */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              Upcoming Queue
            </h3>
            <div className="space-y-4">
              {scheduledPosts.map(post => (
                <div key={post.id} className="p-4 border border-slate-100 rounded-xl hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
                      {post.platform === 'Facebook' && <Share2 size={16} className="text-blue-600" />}
                      {post.platform === 'Instagram' && <Camera size={16} className="text-pink-600" />}
                      {post.platform === 'Twitter' && <X size={16} className="text-sky-500" />}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{post.time}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{post.title}</h4>
                  <div className={`mt-2 text-[10px] font-bold inline-block px-2 py-0.5 rounded-full ${post.status === 'Scheduled' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {post.status}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
              View Full Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
