export interface Creative {
  id: string;
  category: 'Cinematic' | 'Minimalist' | 'Digital Art' | 'Photorealistic';
  name: string;
  style: string;
  dimensions: string;
  prompt: string;
  tags: string[];
  imageUrl: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  platform: 'Facebook' | 'Instagram' | 'Twitter' | 'LinkedIn';
  time: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  createdAt: string;
}

export interface DashboardStats {
  totalPosts: number;
  activeChannels: number;
  totalReach: string;
  generationsThisMonth: number;
}

export interface AnalyticsData {
  weeklyReach: { day: string; count: number }[];
  postsByPlatform: { platform: string; count: number; color: string }[];
  postsByStatus: { status: string; count: number; color: string }[];
  leadsByCategory: { category: string; count: number; color: string }[];
  leadsByStatus: { status: string; count: number; color: string }[];
}

export const CREATIVES: Creative[] = [
  {
    id: 'c1',
    category: 'Cinematic',
    name: 'Neo-Tokyo 2099',
    style: 'Unreal Engine 5',
    dimensions: '1920x1080',
    prompt: 'A futuristic city with neon lights and flying cars...',
    tags: ['Future', 'Neon', 'Sci-Fi'],
    imageUrl: 'https://images.unsplash.com/photo-1514924013411-cbf25faa35bb'
  },
  {
    id: 'c2',
    category: 'Minimalist',
    name: 'Zen Garden',
    style: 'Clean Lines',
    dimensions: '1080x1080',
    prompt: 'A minimalist zen garden with sand patterns and single stone...',
    tags: ['Peace', 'Zen', 'Nature'],
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f45d8de4'
  }
];

export const SCHEDULED_POSTS: ScheduledPost[] = [
  {
    id: '1',
    title: 'Summer Campaign Launch',
    platform: 'Instagram',
    time: '2026-05-20T09:00:00Z',
    status: 'Scheduled',
    createdAt: '2026-05-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Product Showcase - AI Art',
    platform: 'Facebook',
    time: '2026-05-21T11:30:00Z',
    status: 'Draft',
    createdAt: '2026-05-14T14:45:00Z'
  }
];

export const DASHBOARD_STATS: DashboardStats = {
  totalPosts: 1284,
  activeChannels: 4,
  totalReach: '852.4k',
  generationsThisMonth: 256
};

export const ANALYTICS_DATA: AnalyticsData = {
  weeklyReach: [
    { day: 'Mon', count: 42000 },
    { day: 'Tue', count: 58000 },
    { day: 'Wed', count: 45000 },
    { day: 'Thu', count: 62000 },
    { day: 'Fri', count: 75000 },
    { day: 'Sat', count: 35000 },
    { day: 'Sun', count: 28000 },
  ],
  postsByPlatform: [
    { platform: 'Instagram', count: 45, color: '#E1306C' },
    { platform: 'Facebook', count: 32, color: '#1877F2' },
    { platform: 'Twitter', count: 28, color: '#1DA1F2' },
    { platform: 'LinkedIn', count: 19, color: '#0A66C2' },
  ],
  postsByStatus: [
    { status: 'Published', count: 120, color: '#10B981' },
    { status: 'Scheduled', count: 42, color: '#6366F1' },
    { status: 'Draft', count: 28, color: '#F59E0B' },
  ],
  leadsByCategory: [
    { category: 'Cinematic', count: 45, color: '#6366F1' },
    { category: 'Minimalist', count: 32, color: '#F59E0B' },
    { category: 'Digital Art', count: 28, color: '#10B981' },
    { category: 'Photorealistic', count: 19, color: '#94A3B8' },
  ],
  leadsByStatus: [
    { status: 'In Queue', count: 54, color: '#6366F1' },
    { status: 'Processing', count: 42, color: '#F59E0B' },
    { status: 'Completed', count: 28, color: '#10B981' },
    { status: 'Failed', count: 15, color: '#8B5CF6' },
  ]
};


