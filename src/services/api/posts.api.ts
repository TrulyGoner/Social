// Using mock data instead of real API calls
import {
  Post,
  CreatePostData,
  UpdatePostData,
  PostFilters,
} from '../../features/posts/types/post.types';

export interface PostsResponse {
  posts: Post[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export const postsApi = {
  async getPosts(filters?: PostFilters): Promise<{ data: PostsResponse }> {
    // Always return mock data for demo purposes
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            posts: [
              {
                id: '1',
                content:
                  'Sample post content - exploring the latest trends in social media marketing! 🚀',
                platform: 'twitter',
                status: 'published',
                publishedAt: '2024-01-15T10:30:00Z',
                engagement: {
                  likes: 245,
                  shares: 23,
                  comments: 12,
                  views: 1520,
                },
                hashtags: ['marketing', 'socialmedia', 'trends'],
                createdAt: '2024-01-15T09:00:00Z',
                updatedAt: '2024-01-15T10:30:00Z',
                authorId: 'user1',
              },
              {
                id: '2',
                content:
                  'Behind the scenes: Our team working on the latest app update!',
                platform: 'instagram',
                status: 'published',
                publishedAt: '2024-01-14T14:20:00Z',
                engagement: {
                  likes: 189,
                  shares: 15,
                  comments: 8,
                  views: 890,
                },
                hashtags: ['behindthescenes', 'teamwork', 'app'],
                createdAt: '2024-01-14T13:00:00Z',
                updatedAt: '2024-01-14T14:20:00Z',
                authorId: 'user1',
              },
              {
                id: '3',
                content:
                  'Tips for better productivity in remote work environments',
                platform: 'linkedin',
                status: 'scheduled',
                scheduledFor: '2024-01-20T09:00:00Z',
                hashtags: ['productivity', 'remotework', 'tips'],
                createdAt: '2024-01-12T11:00:00Z',
                updatedAt: '2024-01-12T11:00:00Z',
                authorId: 'user1',
              },
            ],
            totalCount: 3,
            page: 1,
            pageSize: 10,
          },
        });
      }, 300);
    });
  },

  async getPost(id: string): Promise<{ data: Post }> {
    // Return mock post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            content: 'Sample post content',
            platform: 'twitter',
            status: 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            authorId: 'user1',
          },
        });
      }, 200);
    });
  },

  async createPost(postData: CreatePostData): Promise<{ data: Post }> {
    // Return mock created post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: Date.now().toString(),
            ...postData,
            status: 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            authorId: 'user1',
          },
        });
      }, 200);
    });
  },

  async updatePost(
    id: string,
    postData: Partial<UpdatePostData>
  ): Promise<{ data: Post }> {
    // Return mock updated post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            content: 'Updated content',
            platform: 'twitter',
            status: 'published',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            authorId: 'user1',
            ...postData,
          },
        });
      }, 200);
    });
  },

  async deletePost(id: string): Promise<void> {
    // Silently succeed for mock
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Mock delete post ${id}`);
        resolve();
      }, 200);
    });
  },

  async schedulePost(id: string, scheduledAt: string): Promise<{ data: Post }> {
    // Return mock scheduled post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            content: 'Scheduled content',
            platform: 'twitter',
            status: 'scheduled',
            scheduledFor: scheduledAt,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            authorId: 'user1',
          },
        });
      }, 200);
    });
  },

  async publishPost(id: string): Promise<{ data: Post }> {
    // Return mock published post
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            content: 'Published content',
            platform: 'twitter',
            status: 'published',
            publishedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            authorId: 'user1',
          },
        });
      }, 200);
    });
  },
};
