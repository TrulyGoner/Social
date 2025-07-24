export interface AnalyticsData {
    totalFollowers: number;
    followersChange: number;
    engagementRate: number;
    engagementChange: number;
    totalShares: number;
    sharesChange: number;
    totalComments: number;
    commentsChange: number;
    totalPosts: number;
    postsChange: number;
  }
  
  export interface PlatformAnalytics {
    platform: string;
    followers: number;
    engagement: {
      likes: number;
      shares: number;
      comments: number;
      rate: number;
    };
    posts: {
      total: number;
      published: number;
      scheduled: number;
    };
    growth: {
      followers: number;
      engagement: number;
    };
  }
  
  export interface EngagementMetrics {
    date: string;
    likes: number;
    shares: number;
    comments: number;
    impressions: number;
    reach: number;
  }
  
  export interface AnalyticsTimeRange {
    start: Date;
    end: Date;
    period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  }