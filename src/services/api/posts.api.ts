import { apiClient } from '../utils/apiClient';
import { Post, CreatePostData, UpdatePostData, PostFilters } from '../../features/posts/types/post.types';

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export const postsApi = {
  async getPosts(filters?: PostFilters): Promise<{ data: PostsResponse }> {
    try {
      const params = new URLSearchParams();

      if (filters?.platform) {
        params.append('platform', filters.platform);
      }
      if (filters?.status) {
        params.append('status', filters.status);
      }
      if (filters?.dateFrom) {
        params.append('dateFrom', filters.dateFrom);
      }
      if (filters?.dateTo) {
        params.append('dateTo', filters.dateTo);
      }
      if (filters?.search) {
        params.append('search', filters.search);
      }

      const response = await apiClient.get<PostsResponse>(`/posts?${params.toString()}`);
      return response;
    } catch (error) {
      // Return mock data if API is unavailable
      return {
        data: {
          posts: [
            {
              id: '1',
              content: 'Sample post content - exploring the latest trends in social media marketing! 🚀',
              platform: 'twitter',
              status: 'published',
              publishedAt: new Date('2024-01-15T10:30:00Z'),
              engagement: {
                likes: 245,
                shares: 23,
                comments: 12,
                views: 1520
              },
              hashtags: ['marketing', 'socialmedia', 'trends'],
              createdAt: new Date('2024-01-15T09:00:00Z'),
              updatedAt: new Date('2024-01-15T10:30:00Z'),
              authorId: 'user1'
            },
            {
              id: '2',
              content: 'Behind the scenes: Our team working on the latest app update!',
              platform: 'instagram',
              status: 'published',
              publishedAt: new Date('2024-01-14T14:20:00Z'),
              engagement: {
                likes: 189,
                shares: 15,
                comments: 8,
                views: 890
              },
              hashtags: ['behindthescenes', 'teamwork', 'app'],
              createdAt: new Date('2024-01-14T13:00:00Z'),
              updatedAt: new Date('2024-01-14T14:20:00Z'),
              authorId: 'user1'
            },
            {
              id: '3',
              content: 'Tips for better productivity in remote work environments',
              platform: 'linkedin',
              status: 'scheduled',
              scheduledFor: new Date('2024-01-20T09:00:00Z'),
              hashtags: ['productivity', 'remotework', 'tips'],
              createdAt: new Date('2024-01-12T11:00:00Z'),
              updatedAt: new Date('2024-01-12T11:00:00Z'),
              authorId: 'user1'
            }
          ],
          totalCount: 3,
          page: 1,
          pageSize: 10
        }
      };
    }
  },

  async getPost(id: string): Promise<{ data: Post }> {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response;
  },

  async createPost(postData: CreatePostData): Promise<{ data: Post }> {
    const response = await apiClient.post<Post>('/posts', postData);
    return response;
  },

  async updatePost(id: string, postData: Partial<UpdatePostData>): Promise<{ data: Post }> {
    const response = await apiClient.put<Post>(`/posts/${id}`, postData);
    return response;
  },

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`/posts/${id}`);
  },

  async schedulePost(id: string, scheduledAt: string): Promise<{ data: Post }> {
    const response = await apiClient.patch<Post>(`/posts/${id}/schedule`, {
      scheduledAt,
    });
    return response;
  },

  async publishPost(id: string): Promise<{ data: Post }> {
    const response = await apiClient.patch<Post>(`/posts/${id}/publish`);
    return response;
  },
};
