'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  ShieldAlert,
  Download,
  Clock,
  User as UserIcon,
  ArrowUpDown,
  Activity,
  UserCheck,
  Ban,
  X,
  Loader2,
  Eye,
  Trash2,
  Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:5000/api';

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  password?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [globalStats, setGlobalStats] = useState({ total: 0, active: 0, inactive: 0, ban: 0 });

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user', status: 'active' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, limit, statusFilter, roleFilter]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== 1) setPage(1);
      else fetchUsers();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: searchTerm,
        status: statusFilter,
        role: roleFilter
      });
      
      const response = await fetch(`${API_BASE_URL}/users?${params}`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.users);
      setPagination(data.pagination);
      setGlobalStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await fetch(`${API_BASE_URL}/users/export`);
      if (!response.ok) throw new Error('Failed to export users');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const url = editingUser ? `${API_BASE_URL}/users/${editingUser.id}` : `${API_BASE_URL}/users`;
      const method = editingUser ? 'PUT' : 'POST';
      
      // Don't send empty password on update
      const body = { ...formData };
      if (editingUser && !body.password) {
        delete body.password;
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      if (!response.ok) throw new Error(`Failed to ${editingUser ? 'update' : 'create'} user`);
      
      await fetchUsers();
      closeModals();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setEditingUser(null);
    setViewingUser(null);
    setFormData({ name: '', email: '', password: '', role: 'user', status: 'active' });
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ 
      name: user.name || '', 
      email: user.email || '', 
      password: '', 
      role: user.role || 'user',
      status: user.status || 'active'
    });
    setShowAddModal(true);
  };

  const openViewModal = (user: User) => {
    setViewingUser(user);
    setShowViewModal(true);
  };

  const handleDeleteUser = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      await fetchUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const stats = [
    { label: 'Total Users', value: globalStats.total.toString(), icon: UserIcon, color: 'bg-blue-500', shadow: 'shadow-blue-500/20' },
    { label: 'Active', value: globalStats.active.toString(), icon: UserCheck, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
    { label: 'Inactive', value: globalStats.inactive.toString(), icon: Clock, color: 'bg-amber-500', shadow: 'shadow-amber-500/20' },
    { label: 'Banned', value: globalStats.ban.toString(), icon: Ban, color: 'bg-rose-500', shadow: 'shadow-rose-500/20' },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage platform access, roles, and creative permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-indigo-200 transition-colors group"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between items-center bg-slate-50/30">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="relative w-full sm:w-40">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm appearance-none cursor-pointer hover:border-indigo-300"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Ban">Banned</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ArrowUpDown size={12} />
              </div>
            </div>

            {/* Role Filter */}
            <div className="relative w-full sm:w-40">
              <ShieldAlert className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-11 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm appearance-none cursor-pointer hover:border-indigo-300"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ArrowUpDown size={12} />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-indigo-600" size={40} />
              <p className="text-slate-500 font-medium">Fetching users from database...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-rose-600">
              <ShieldAlert size={40} />
              <p className="font-bold">{error}</p>
              <button onClick={fetchUsers} className="text-sm underline">Try again</button>
            </div>
          ) : (
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 font-bold text-[10px] uppercase tracking-wider border-b border-slate-100">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Account Role</th>
                  <th className="px-6 py-4">Account Status</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {users.map((user) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={user.id} 
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase shadow-sm group-hover:from-indigo-50 group-hover:to-indigo-100 group-hover:border-indigo-200 transition-all">
                            {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{user.name}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {user.role === 'admin' && <ShieldAlert size={12} />}
                          {user.role}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            user.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                            user.status === 'inactive' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
                            user.status === 'ban' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                            'bg-slate-400'
                          }`}></div>
                          <span className={`text-xs font-bold capitalize ${
                            user.status === 'active' ? 'text-emerald-600' :
                            user.status === 'inactive' ? 'text-amber-600' :
                            user.status === 'ban' ? 'text-rose-600' :
                            'text-slate-500'
                          }`}>{user.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            title="View Details" 
                            onClick={() => openViewModal(user)}
                            className="p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all border border-transparent hover:border-indigo-100"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            title="Edit User" 
                            onClick={() => openEditModal(user)}
                            className="p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-all border border-transparent hover:border-amber-100"
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            title="Delete User" 
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all border border-transparent hover:border-rose-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
                {users.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <UserIcon className="text-slate-200" size={48} />
                        <p className="text-slate-400 font-medium">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing {users.length} of {pagination.total} users
            </p>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <select 
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1);
              }}
              className="bg-transparent text-xs font-bold text-slate-500 focus:outline-none cursor-pointer"
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button 
              disabled={page === 1 || loading}
              onClick={() => setPage(prev => Math.max(1, prev - 1))}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-sm"
            >
              <MoreHorizontal size={16} className="rotate-180" />
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(pagination.totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Show only a few page numbers around the current page
                if (
                  pageNum === 1 || 
                  pageNum === pagination.totalPages || 
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        page === pageNum 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  (pageNum === 2 && page > 3) || 
                  (pageNum === pagination.totalPages - 1 && page < pagination.totalPages - 2)
                ) {
                  return <span key={pageNum} className="text-slate-400 text-xs">...</span>;
                }
                return null;
              })}
            </div>

            <button 
              disabled={page === pagination.totalPages || loading}
              onClick={() => setPage(prev => Math.min(pagination.totalPages, prev + 1))}
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors shadow-sm"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModals}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h2>
                    <p className="text-slate-500 text-sm mt-1">{editingUser ? `Updating: ${editingUser.name}` : 'Create a new account manually'}</p>
                  </div>
                  <button 
                    onClick={closeModals}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                      {editingUser ? 'New Password (Optional)' : 'Password'}
                    </label>
                    <input 
                      required={!editingUser}
                      type="password" 
                      placeholder={editingUser ? "Leave blank to keep current" : "Min. 8 characters"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Assign Role</label>
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                      >
                        <option value="user">Standard User</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Account Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="ban">Banned</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button 
                      type="button"
                      onClick={closeModals}
                      className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-2 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (editingUser ? <Pencil size={20} /> : <UserPlus size={20} />)}
                      {editingUser ? 'Update User' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View User Modal */}
      <AnimatePresence>
        {showViewModal && viewingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModals}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">User Profile</h2>
                    <p className="text-slate-500 text-sm mt-1">Detailed account information</p>
                  </div>
                  <button 
                    onClick={closeModals}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700">
                      {viewingUser.name}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                    <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700">
                      {viewingUser.email}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Account Role</label>
                      <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 capitalize">
                        {viewingUser.role}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Account Status</label>
                      <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold flex items-center gap-2 capitalize">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          viewingUser.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                          viewingUser.status === 'inactive' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
                          'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'
                        }`}></div>
                        <span className={
                          viewingUser.status === 'active' ? 'text-emerald-600' :
                          viewingUser.status === 'inactive' ? 'text-amber-600' :
                          'text-rose-600'
                        }>{viewingUser.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Joined On</label>
                      <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700">
                        {new Date(viewingUser.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">User ID</label>
                      <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700">
                        #{viewingUser.id}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex gap-3">
                  <button 
                    onClick={closeModals}
                    className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => openEditModal(viewingUser)}
                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Pencil size={20} />
                    Edit User
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
