'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BarChart3, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Share2,
  Camera,
  X,
  Globe,
  Clock,
  Wand2,
  Image as ImageIcon
} from 'lucide-react';

const stats = [
  { label: 'Total Posts', value: '1,284', change: '+12.5%', trend: 'up', icon: BarChart3 },
  { label: 'Active Channels', value: '4', change: '0%', trend: 'neutral', icon: Share2 },
  { label: 'Total Reach', value: '852.4k', change: '+18.2%', trend: 'up', icon: TrendingUp },
  { label: 'AI Generations', value: '256', change: '+24.1%', trend: 'up', icon: Wand2 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Studio Dashboard</h2>
        <p className="text-slate-500 mt-2">Welcome back! Here's what's happening across your channels.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-600' : stat.trend === 'down' ? 'text-rose-600' : 'text-slate-400'}`}>
                {stat.trend === 'up' && <ArrowUpRight size={14} />}
                {stat.trend === 'down' && <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Engagement Overview</h3>
            <select className="text-sm border-none bg-slate-50 rounded-lg px-3 py-1.5 focus:ring-0">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[40, 65, 45, 90, 55, 75, 85].map((val, i) => (
              <div key={i} className="flex-1 space-y-2">
                <div className="relative group">
                  <div 
                    className="w-full bg-indigo-100 rounded-t-lg group-hover:bg-indigo-200 transition-colors" 
                    style={{ height: `${val}%` }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-indigo-600 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" 
                      style={{ height: `${val * 0.7}%` }}
                    />
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 text-center font-bold">Day {i + 1}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { type: 'generate', title: 'New Image Generated', time: '2 mins ago', icon: Wand2, color: 'text-violet-600', bg: 'bg-violet-50' },
              { type: 'post', title: 'Post Published on IG', time: '1 hour ago', icon: Camera, color: 'text-pink-600', bg: 'bg-pink-50' },
              { type: 'schedule', title: 'Campaign Scheduled', time: '4 hours ago', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { type: 'account', title: 'Facebook Connected', time: 'Yesterday', icon: Share2, color: 'text-blue-600', bg: 'bg-blue-50' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`p-2 rounded-xl ${activity.bg} ${activity.color} shrink-0`}>
                  <activity.icon size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{activity.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
