export const ROUTES = {
  dashboard: '/dashboard',
  posts: '/posts',
  analytics: '/analytics',
  calendar: '/calendar',
  settings: '/settings',
} as const;

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const SOCIAL_PLATFORMS = {
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  VK: 'vk',
} as const;

export const POST_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  FAILED: 'failed',
} as const;
