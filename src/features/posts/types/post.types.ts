export type Platform = 'twitter' | 'instagram' | 'facebook' | 'linkedin';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface PostEngagement {
  likes: number;
  shares: number;
  comments: number;
  views?: number;
}

export interface Post {
  id: string;
  content: string;
  platform: Platform;
  status: PostStatus;
  scheduledFor?: string;
  publishedAt?: string;
  engagement?: PostEngagement;
  mediaUrls?: string[];
  hashtags?: string[];
  mentions?: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
}

export interface CreatePostData {
  content: string;
  platform: Platform;
  scheduledFor?: string;
  mediaUrls?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export interface PostFilters {
  platform?: Platform;
  status?: PostStatus;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  limit?: number;
}
