// import { apiClient } from '../utils/apiClient'; // Not used for mock data
import {
  AnalyticsData,
  PlatformAnalytics,
  EngagementMetrics,
  AnalyticsFilters,
} from '../../features/posts/analytics/types/analytics.types';

export interface AnalyticsResponse {
  data: AnalyticsData;
  success: boolean;
}

export const analyticsApi = {
  async getOverview(
    filters?: AnalyticsFilters
  ): Promise<{ data: AnalyticsResponse }> {
    // For demo purposes, return mock data since there's no backend
    const mockData: AnalyticsResponse = {
      data: {
        totalFollowers: 2400,
        followersChange: 12.5,
        engagementRate: 5.8,
        engagementChange: 2.1,
        totalShares: 892,
        sharesChange: 15.3,
        totalComments: 1400,
        commentsChange: 8.7,
        totalPosts: 42,
        postsChange: 12.0,
        totalImpressions: 124500,
        impressionsChange: 22.1,
      },
      success: true,
    };

    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => resolve({ data: mockData }), 500);
    });
  },

  async getPlatformAnalytics(
    platform: string
  ): Promise<{ data: PlatformAnalytics }> {
    // Mock platform analytics data
    const mockPlatformData: PlatformAnalytics = {
      platform,
      followers: Math.floor(Math.random() * 5000) + 1000,
      engagement: Math.floor(Math.random() * 10) + 2,
      posts: Math.floor(Math.random() * 50) + 10,
      growthRate: Math.floor(Math.random() * 20) + 5,
    };

    return new Promise(resolve => {
      setTimeout(() => resolve({ data: mockPlatformData }), 300);
    });
  },

  async getEngagementTrends(
    filters?: AnalyticsFilters
  ): Promise<{ data: EngagementMetrics[] }> {
    // Generate mock trend data
    const mockTrends: EngagementMetrics[] = Array.from(
      { length: 7 },
      (_, i) => ({
        date: new Date(
          Date.now() - (6 - i) * 24 * 60 * 60 * 1000
        ).toISOString(),
        likes: Math.floor(Math.random() * 100) + 50,
        shares: Math.floor(Math.random() * 30) + 10,
        comments: Math.floor(Math.random() * 20) + 5,
        impressions: Math.floor(Math.random() * 1000) + 500,
      })
    );

    return new Promise(resolve => {
      setTimeout(() => resolve({ data: mockTrends }), 400);
    });
  },
};
