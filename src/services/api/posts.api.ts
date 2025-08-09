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

// Example mock posts array
const mockPosts: Post[] = [
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
];

// Helper to find a post by id
function findPostById(id: string): Post | undefined {
  return mockPosts.find((post) => post.id === id);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            ...postData,
            updatedAt: new Date().toISOString(),
          } as Post,
        });
      }, 200);
    });
  },

  async schedulePost(
    id: string,
    scheduledAt: string,
    postData?: Partial<Post>
  ): Promise<{ data: Post }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id,
            ...(postData || {}),
            status: 'scheduled',
            scheduledFor: scheduledAt,
            updatedAt: new Date().toISOString(),
          } as Post,
        });
      }, 200);
    });
  },

  async publishPost(
    id: string,
    postData?: Partial<Post>
  ): Promise<{ data: Post }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existing = findPostById(id);
        if (!existing) {
          reject(new Error('Post not found'));
          return;
        }
        const updated: Post = {
          ...existing,
          ...postData,
          status: 'published',
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        resolve({ data: updated });
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
};
