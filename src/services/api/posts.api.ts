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
