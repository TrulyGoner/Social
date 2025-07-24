import { Platform, PostStatus } from '../../features/posts/types/post.types';

export const getPlatformColor = (platform: Platform): string => {
  const colors = {
    twitter: 'bg-twitter',
    instagram: 'bg-instagram', 
    facebook: 'bg-facebook',
    linkedin: 'bg-linkedin',
  };
  return colors[platform] || 'bg-gray-500';
};

export const getStatusColor = (status: PostStatus): string => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getPlatformIcon = (platform: Platform): string => {
  const icons = {
    twitter: '🐦',
    instagram: '📷',
    facebook: '👥',
    linkedin: '💼',
  };
  return icons[platform] || '📱';
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateAvatarUrl = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=ffffff`;
};
