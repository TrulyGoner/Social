import { apiClient } from '../utils/apiClient';
import { AnalyticsData, AnalyticsFilters } from '../../features/posts/analytics/types/analytics.types';

export interface AnalyticsResponse {
  data: AnalyticsData;
  period: {
    from: string;
    to: string;
  };
}

export interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  impressions: number;
}

export interface PlatformAnalytics {
  platform: string;
  metrics: EngagementMetrics;
  growth: number;
  topPosts: Array<{
    id: string;
    content: string;
    engagement: number;
    platform: string;
  }>;
}

export const analyticsApi = {
  async getOverview(filters?: AnalyticsFilters): Promise<{ data: AnalyticsResponse }> {
    const params = new URLSearchParams();
    
    if (filters?.dateFrom) {
      params.append('dateFrom', filters.dateFrom);
    }
    if (filters?.dateTo) {
      params.append('dateTo', filters.dateTo);
    }
    if (filters?.platform) {
      params.append('platform', filters.platform);
    }

    const response = await apiClient.get<AnalyticsResponse>(`/analytics/overview?${params.toString()}`);
    return response;
  },

  async getPlatformAnalytics(platform: string, filters?: AnalyticsFilters): Promise<{ data: PlatformAnalytics }> {
    const params = new URLSearchParams();
    
    if (filters?.dateFrom) {
      params.append('dateFrom', filters.dateFrom);
    }
    if (filters?.dateTo) {
      params.append('dateTo', filters.dateTo);
    }

    const response = await apiClient.get<PlatformAnalytics>(`/analytics/platform/${platform}?${params.toString()}`);
    return response;
  },

  async getEngagementTrends(filters?: AnalyticsFilters): Promise<{ data: any[] }> {
    const params = new URLSearchParams();
    
    if (filters?.dateFrom) {
      params.append('dateFrom', filters.dateFrom);
    }
    if (filters?.dateTo) {
      params.append('dateTo', filters.dateTo);
    }
    if (filters?.platform) {
      params.append('platform', filters.platform);
    }

    const response = await apiClient.get<any[]>(`/analytics/engagement-trends?${params.toString()}`);
    return response;
  },

  async getTopContent(filters?: AnalyticsFilters & { limit?: number }): Promise<{ data: any[] }> {
    const params = new URLSearchParams();
    
    if (filters?.dateFrom) {
      params.append('dateFrom', filters.dateFrom);
    }
    if (filters?.dateTo) {
      params.append('dateTo', filters.dateTo);
    }
    if (filters?.platform) {
      params.append('platform', filters.platform);
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString());
    }

    const response = await apiClient.get<any[]>(`/analytics/top-content?${params.toString()}`);
    return response;
  },
};
