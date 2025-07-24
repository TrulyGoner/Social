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
  totalImpressions: number;
  impressionsChange: number;
}

export interface PlatformAnalytics {
  platform: string;
  followers: number;
  engagement: number;
  posts: number;
  growthRate: number;
}

export interface EngagementMetrics {
  date: string;
  likes: number;
  shares: number;
  comments: number;
  impressions: number;
}

export interface AnalyticsFilters {
  dateFrom?: string;
  dateTo?: string;
  platform?: string;
  metric?: string;
}
