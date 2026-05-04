'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  MoreHorizontal, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  ArrowUpDown,
  User,
  ShieldCheck,
  Plus,
  ChevronRight
} from 'lucide-react';

const MOCK_CLAIMS = [
  { id: 'CLM-9021', customer: 'Rahul Sharma', policy: 'Health Optima', provider: 'Star Health', amount: '₹1,25,000', type: 'Medical', status: 'In Review', date: '12 Apr 2026' },
  { id: 'CLM-9022', customer: 'Priya Patel', policy: 'Life iProtect', provider: 'ICICI Pru', amount: '₹50,00,000', type: 'Death', status: 'Submitted', date: '14 Apr 2026' },
  { id: 'CLM-9023', customer: 'Amit Kumar', policy: 'Car Comp.', provider: 'Bajaj Allianz', amount: '₹12,400', type: 'Accident', status: 'Approved', date: '10 Apr 2026' },
  { id: 'CLM-9024', customer: 'Sneha Gupta', policy: 'ReAssure', provider: 'Niva Bupa', amount: '₹45,000', type: 'Medical', status: 'Rejected', date: '08 Apr 2026' },
  { id: 'CLM-9025', customer: 'Vikram Singh', policy: 'Explore', provider: 'Religare', amount: '₹8,500', type: 'Travel', status: 'In Review', date: '15 Apr 2026' },
  { id: 'CLM-9026', customer: 'Anjali Desai', policy: 'Click 2 Protect', provider: 'HDFC Life', amount: '₹25,00,000', type: 'Critical', status: 'Submitted', date: '16 Apr 2026' },
];

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClaims = MOCK_CLAIMS.filter(claim => 
    claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Claims Management</h1>
          <p className="text-slate-500 mt-1">Monitor, review, and process insurance claims</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Reports
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
            <Plus size={18} />
            New Claim
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Pending', value: '24', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Review', value: '15', icon: Eye, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Approved (MTD)', value: '142', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Rejected (MTD)', value: '8', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Claims Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Claim ID or Customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all">
              <ArrowUpDown size={16} />
              Sort
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4">Claim Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Provider / Policy</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-white transition-colors">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{claim.id}</p>
                        <p className="text-[10px] font-medium text-slate-400">{claim.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{claim.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-800">{claim.provider}</span>
                      <span className="text-xs text-slate-500">{claim.policy} • {claim.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{claim.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      claim.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                      claim.status === 'In Review' ? 'bg-amber-100 text-amber-700' :
                      claim.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button title="View Documents" className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all">
                        <ShieldCheck size={18} />
                      </button>
                      <button title="More Options" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
          <p className="text-sm text-slate-500">Showing 6 claims of 42 total</p>
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2">
            View Archive
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
