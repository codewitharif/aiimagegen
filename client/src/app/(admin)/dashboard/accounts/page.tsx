'use client';

import React from 'react';
import { Share2, Camera, X, Globe, Plus, ExternalLink, Settings, AlertCircle, CheckCircle2 } from 'lucide-react';

const socialAccounts = [
  { id: 1, platform: 'Facebook', handle: '@creativeai_studio', status: 'Connected', followers: '12.4k', icon: Share2, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 2, platform: 'Instagram', handle: '@creativeai.art', status: 'Connected', followers: '45.2k', icon: Camera, color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { id: 3, platform: 'Twitter', handle: '@creativeai_hq', status: 'Connected', followers: '8.1k', icon: X, color: 'text-slate-900', bgColor: 'bg-slate-50' },
  { id: 4, platform: 'LinkedIn', handle: 'CreativeAI Studio', status: 'Disconnected', followers: '-', icon: Globe, color: 'text-blue-700', bgColor: 'bg-blue-50' },
];

export default function AccountsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Social Accounts</h2>
          <p className="text-slate-500 mt-2">Connect and manage your social media channels.</p>
        </div>
        
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
          <Plus size={20} />
          Connect New Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {socialAccounts.map((account) => (
          <div key={account.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-3 rounded-2xl ${account.bgColor}`}>
                <account.icon size={24} className={account.color} />
              </div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${account.status === 'Connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {account.status === 'Connected' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                <span className="text-[10px] font-bold uppercase tracking-wider">{account.status}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-slate-900">{account.platform}</h3>
              <p className="text-slate-500 text-sm mt-0.5 font-medium">{account.handle}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Followers</p>
                <p className="text-lg font-bold text-slate-900">{account.followers}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Settings size={18} />
                </button>
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
