'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  MoreVertical,
  Search,
  Filter,
  CalendarCheck,
  User
} from 'lucide-react';

const MOCK_FOLLOWUPS = [
  { id: 1, name: 'Rahul Sharma', policy: 'Health Insurance', type: 'Premium Payment', dueDate: 'Today', time: '10:00 AM', priority: 'High', status: 'Pending' },
  { id: 2, name: 'Priya Patel', policy: 'Life Insurance', type: 'Document Verification', dueDate: 'Today', time: '02:30 PM', priority: 'Medium', status: 'Pending' },
  { id: 3, name: 'Amit Kumar', policy: 'Motor Insurance', type: 'Renewal', dueDate: 'Tomorrow', time: '11:00 AM', priority: 'High', status: 'Pending' },
  { id: 4, name: 'Sneha Gupta', policy: 'Travel Insurance', type: 'Query Resolution', dueDate: 'Expired', time: 'Yesterday', priority: 'Low', status: 'Overdue' },
  { id: 5, name: 'Vikram Singh', policy: 'Health Insurance', type: 'Claim Update', dueDate: '18 Apr', time: '04:00 PM', priority: 'Medium', status: 'Pending' },
];

export default function FollowupPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Follow-up Management</h1>
          <p className="text-slate-500 mt-1">Track and manage your scheduled client interactions</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
          <CalendarCheck size={18} />
          Schedule Follow-up
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Today\'s Tasks', value: '8', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Overdue', value: '3', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Completed Today', value: '12', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Tabs and Search */}
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-6 justify-between items-center">
          <div className="flex p-1 bg-slate-100 rounded-xl w-full lg:w-auto">
            {['upcoming', 'completed', 'overdue'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 lg:flex-none px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                  activeTab === tab 
                  ? 'bg-white text-emerald-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search follow-ups..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Follow-up List */}
        <div className="divide-y divide-slate-100">
          {MOCK_FOLLOWUPS.map((item) => (
            <div key={item.id} className="p-6 hover:bg-slate-50/50 transition-colors group">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* User Info */}
                <div className="flex items-center gap-4 lg:w-1/4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <User size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                    <p className="text-xs text-slate-500 truncate">{item.policy}</p>
                  </div>
                </div>

                {/* Task Details */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Reason</p>
                    <p className="text-sm font-medium text-slate-700">{item.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Scheduled</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-slate-400" />
                      <span className={item.dueDate === 'Expired' ? 'text-rose-600 font-bold' : 'text-slate-700 font-medium'}>
                        {item.dueDate}
                      </span>
                      <span className="text-slate-400">@ {item.time}</span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Priority</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                      item.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 lg:justify-end lg:w-1/5">
                  <button title="Call Client" className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                    <Phone size={18} />
                  </button>
                  <button title="Email Client" className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                    <Mail size={18} />
                  </button>
                  <button title="Mark as Done" className="p-2.5 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                    <CheckCircle2 size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center">
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-center gap-2 mx-auto">
            View All Follow-ups
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
