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
  scheduledFor?: Date;
  publishedAt?: Date;
  engagement?: PostEngagement;
  mediaUrls?: string[];
  hashtags?: string[];
  mentions?: string[];
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface CreatePostData {
  content: string;
  platform: Platform;
  scheduledFor?: Date;
  mediaUrls?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}

export interface PostFilters {
  platform?: Platform;
  status?: PostStatus;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}