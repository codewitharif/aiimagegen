'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Bot,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Wand2,
  Image,
  Calendar,
  Share2,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/navigation';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wand2, label: 'AI Generator', href: '/dashboard/generator' },
  { icon: Calendar, label: 'Scheduler', href: '/dashboard/scheduler' },
  { icon: Image, label: 'Creative Library', href: '/dashboard/library' },
  { icon: Share2, label: 'Social Accounts', href: '/dashboard/accounts' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Users', href: '/dashboard/users' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside className={`
      hidden lg:flex bg-slate-900 text-white flex-col h-screen sticky top-0 border-r border-slate-800 flex-shrink-0 transition-all duration-300 ease-in-out relative
      ${isCollapsed ? 'w-16' : 'w-64 xl:w-72'}
    `}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-400 transition-colors z-50 border-2 border-slate-900"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className={`px-4 py-5 flex items-center border-b border-slate-800 ${isCollapsed ? 'justify-center' : 'gap-3 xl:gap-4'}`}>
        <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
          <Wand2 size={20} className="text-white" />
        </div>
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-0"
          >
            <h1 className="font-bold text-sm xl:text-base leading-tight tracking-tight truncate">CreativeAI</h1>
            <p className="text-slate-400 text-[9px] xl:text-[10px] font-medium uppercase tracking-wider mt-0.5 truncate">Studio Suite</p>
          </motion.div>
        )}
      </div>

      <nav className={`flex-1 pt-4 pb-4 space-y-1.5 overflow-y-auto overflow-x-hidden ${isCollapsed ? 'px-2' : 'px-3 xl:px-4'}`}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} title={isCollapsed ? item.label : ''}>
              <div className={`
                flex items-center transition-all duration-200 group relative
                ${isCollapsed ? 'justify-center py-3 px-0 rounded-xl' : 'gap-3 xl:gap-4 px-3 xl:px-4 py-2.5 xl:py-3'}
                ${isActive 
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border-l-4 border-indigo-300 rounded-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white border-l-4 border-transparent rounded-lg'
                }
                ${isCollapsed && isActive ? 'border-l-0 bg-indigo-500 shadow-indigo-500/40' : ''}
              `}>
                <item.icon size={18} className={`shrink-0 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                {!isCollapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-semibold text-xs xl:text-sm truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
                {!isCollapsed && isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className={`py-4 xl:py-5 border-t border-slate-800 space-y-1.5 ${isCollapsed ? 'px-2' : 'px-3 xl:px-4'}`}>
        <Link href="/dashboard/settings">
          <div className={`
            transition-all duration-200 cursor-pointer flex items-center border-l-4 group rounded-lg
            ${isCollapsed ? 'justify-center py-3 px-0' : 'gap-3 xl:gap-4 px-3 xl:px-4 py-2.5 xl:py-3'}
            ${pathname === '/dashboard/settings'
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 border-indigo-300'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white border-transparent'
            }
          `} title={isCollapsed ? 'Settings' : ''}>
            <Settings size={18} className={`shrink-0 ${pathname === '/dashboard/settings' ? 'text-white' : 'group-hover:text-white'}`} />
            {!isCollapsed && <span className="font-semibold text-xs xl:text-sm">Settings</span>}
          </div>
        </Link>
        <button 
          onClick={handleLogout}
          className={`
            w-full text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer flex items-center border-l-4 border-transparent group rounded-lg
            ${isCollapsed ? 'justify-center py-3 px-0' : 'gap-3 xl:gap-4 px-3 xl:px-4 py-2.5 xl:py-3'}
          `} title={isCollapsed ? 'Exit Dashboard' : ''}
        >
          <LogOut size={18} className="shrink-0" />
          {!isCollapsed && <span className="font-semibold text-xs xl:text-sm text-left">Exit Dashboard</span>}
        </button>
      </div>
    </aside>
  );
}
