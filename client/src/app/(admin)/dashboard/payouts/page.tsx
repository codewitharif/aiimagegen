'use client';

import React, { useState } from 'react';
import { 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  MoreVertical,
  ChevronRight,
  CheckCircle2,
  Clock,
  Building2
} from 'lucide-react';

const MOCK_PAYOUTS = [
  { id: 'PAY-7701', provider: 'Star Health', amount: '₹12,500', commission: '₹1,875', status: 'Paid', date: '12 Apr 2026', policy: 'Family Health Optima' },
  { id: 'PAY-7702', provider: 'ICICI Pru', amount: '₹8,500', commission: '₹1,275', status: 'Pending', date: '14 Apr 2026', policy: 'iProtect Smart' },
  { id: 'PAY-7703', provider: 'Bajaj Allianz', amount: '₹6,800', commission: '₹1,020', status: 'Paid', date: '10 Apr 2026', policy: 'Car Insurance' },
  { id: 'PAY-7704', provider: 'Niva Bupa', amount: '₹14,200', commission: '₹2,130', status: 'Processing', date: '15 Apr 2026', policy: 'ReAssure Health' },
  { id: 'PAY-7705', provider: 'HDFC Life', amount: '₹9,200', commission: '₹1,380', status: 'Paid', date: '08 Apr 2026', policy: 'Click 2 Protect' },
  { id: 'PAY-7706', provider: 'Religare', amount: '₹1,200', commission: '₹180', status: 'Pending', date: '16 Apr 2026', policy: 'Explore Travel' },
];

export default function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payouts & Revenue</h1>
          <p className="text-slate-500 mt-1">Track commissions and revenue from policy sales</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm">
            <Calendar size={18} />
            This Month
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
            <Download size={18} />
            Export Statement
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: '₹4,28,500', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12.5%' },
          { label: 'Total Commission', value: '₹64,275', icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'Monthly' },
          { label: 'Pending Payouts', value: '₹12,450', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', trend: '4 Payments' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                {stat.trend && i === 0 && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <ArrowUpRight size={10} />
                    {stat.trend}
                  </span>
                )}
              </div>
            </div>
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search provider..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>
            <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Provider / Policy</th>
                <th className="px-6 py-4">Sale Amount</th>
                <th className="px-6 py-4">Commission</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PAYOUTS.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-900">{pay.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <Building2 size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{pay.provider}</p>
                        <p className="text-[10px] text-slate-500">{pay.policy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {pay.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-emerald-600">{pay.commission}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg w-fit text-[10px] font-bold uppercase tracking-wider ${
                      pay.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                      pay.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {pay.status === 'Paid' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {pay.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {pay.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-center">
          <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2">
            View Full Statement
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
