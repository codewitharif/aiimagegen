'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';
import { MOCK_LEADS } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeads = MOCK_LEADS.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.policyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Leads Management</h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">Track and manage potential customers from the chatbot.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shrink-0">
            <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header/Actions */}
        <div className="px-4 sm:px-7 py-4 sm:py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 sm:w-[18px] sm:h-[18px]" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs sm:text-sm font-medium hover:bg-slate-100 transition-colors shrink-0">
              <Filter size={14} className="sm:w-4 sm:h-4" />
              Filter
            </button>
            <div className="h-6 sm:h-8 w-px bg-slate-200 mx-0.5 sm:mx-1"></div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">
              Showing <span className="text-slate-900 font-bold">{filteredLeads.length}</span> results
            </p>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px] lg:min-w-full">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-4 sm:px-7 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 sm:px-7 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Policy Interest</th>
                <th className="px-4 sm:px-7 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 sm:px-7 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-4 sm:px-7 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">Created</th>
                <th className="px-4 sm:px-6 py-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead, i) => (
                <motion.tr 
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-4 sm:px-7 py-4 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px] sm:text-xs border border-emerald-200 shrink-0">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">{lead.name}</p>
                        <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 truncate">ID: #L-00{lead.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-7 py-4 sm:py-5">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate">{lead.policyName}</p>
                      <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wider mt-1 inline-block whitespace-nowrap">
                        {lead.policyCategory}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-7 py-4 sm:py-5">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer group/item">
                        <Mail size={10} className="sm:w-3 sm:h-3" />
                        <span className="text-[10px] sm:text-xs font-medium truncate">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer group/item">
                        <Phone size={10} className="sm:w-3 sm:h-3" />
                        <span className="text-[10px] sm:text-xs font-medium truncate">{lead.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-7 py-4 sm:py-5 text-center">
                    <span className={`
                      inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
                      ${lead.status === 'New' ? 'bg-blue-100 text-blue-600' : 
                        lead.status === 'Contacted' ? 'bg-amber-100 text-amber-600' : 
                        'bg-emerald-100 text-emerald-600'}
                    `}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-7 py-4 sm:py-5 shrink-0">
                    <p className="text-[10px] sm:text-xs font-bold text-slate-700 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <button className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreHorizontal size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-7 py-4 sm:py-5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] sm:text-xs font-medium text-slate-500">
            Page <span className="text-slate-900 font-bold">1</span> of <span className="text-slate-900 font-bold">1</span>
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button disabled className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-400 transition-all">
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button disabled className="p-1 sm:p-1.5 text-slate-400 hover:text-slate-900 disabled:opacity-30 disabled:hover:text-slate-400 transition-all">
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
