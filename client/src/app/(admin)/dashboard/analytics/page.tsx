'use client';

import React from 'react';
import { 
  BarChart, 
  PieChart, 
  Activity, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  Filter,
  Globe,
  Share2
} from 'lucide-react';
import { ANALYTICS_DATA } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-5 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics & Insights</h2>
          <p className="text-slate-500 text-sm mt-2">Deep dive into performance and user behavior.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            Filter Period
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform">
              <Globe size={16} />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Total Reach</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">852.4k</h3>
          <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +12.5% from last month
          </p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
              <Activity size={16} />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Engagement Rate</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">4.2%</h3>
          <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={12} /> +0.8% improvement
          </p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm group">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-1.5 rounded-lg bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
              <Users size={16} />
            </div>
            <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">New Followers</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">12,842</h3>
          <p className="text-[10px] text-rose-500 font-bold mt-2 flex items-center gap-1">
            <TrendingUp size={12} className="rotate-180" /> -2.4% decrease
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Weekly Reach - Bar Chart Mockup */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-base font-bold text-slate-900">Weekly Reach</h3>
            <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-200 uppercase tracking-wider">
              Last 7 Days
            </div>
          </div>
          <div className="h-[220px] flex items-end justify-between gap-2 px-2">
            {ANALYTICS_DATA.weeklyReach.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.count / 80000) * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-indigo-500 rounded-t-lg group-hover:bg-indigo-400 transition-colors relative min-h-[4px]"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {Math.round(day.count / 1000)}k
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content by Platform - Donut Chart Mockup */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-6">Distribution by Platform</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <div className="relative w-36 h-36 shrink-0">
              <div className="w-full h-full rounded-full border-[12px] border-slate-100 relative">
                <div className="absolute inset-0 rounded-full border-[12px] border-indigo-500 border-t-transparent border-l-transparent rotate-45"></div>
                <div className="absolute inset-0 rounded-full border-[12px] border-emerald-500 border-b-transparent border-r-transparent -rotate-12"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold text-slate-900 leading-none">124</p>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Posts</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3.5 w-full">
              {ANALYTICS_DATA.postsByPlatform.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-700 uppercase tracking-tight">{item.platform}</span>
                    </div>
                    <span className="text-slate-900">{item.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count/45)*100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads by Category */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-6">Creative Categories</h3>
          <div className="space-y-5">
            {ANALYTICS_DATA.leadsByCategory.map((item, i) => (
              <div key={i} className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg`} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      <Share2 size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.category}</p>
                      <p className="text-[9px] text-slate-500 font-medium">Performance tag</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">{item.count}</p>
                    <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">High Engagement</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count/45)*100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Status Breakdown */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-6">Generation Status</h3>
          <div className="space-y-5">
            {ANALYTICS_DATA.leadsByStatus.map((item, i) => (
              <div key={i} className="relative">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg`} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      <Activity size={14} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.status}</p>
                      <p className="text-[9px] text-slate-500 font-medium">Workflow stage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">{item.count}</p>
                    <p className="text-[8px] text-emerald-500 font-bold uppercase tracking-widest">Stable</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count/54)*100}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="h-full rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
