import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsData, PlatformAnalytics, EngagementMetrics } from '../../features/analytics/types/analytics.types';
import { analyticsApi } from '../../services/api/analytics.api';

interface AnalyticsState {
  data: AnalyticsData;
  platformAnalytics: PlatformAnalytics[];
  engagementMetrics: EngagementMetrics[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: AnalyticsState = {
  data: {
    totalFollowers: 0,
    followersChange: 0,
    engagementRate: 0,
    engagementChange: 0,
    totalShares: 0,
    sharesChange: 0,
    totalComments: 0,
    commentsChange: 0,
    totalPosts: 0,
    postsChange: 0
  },
  platformAnalytics: [],
  engagementMetrics: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (timeRange?: { start: Date; end: Date }) => {
    const response = await analyticsApi.getAnalyticsData(timeRange);
    return response.data;
  }
);

export const fetchPlatformAnalytics = createAsyncThunk(
  'analytics/fetchPlatformAnalytics',
  async () => {
    const response = await analyticsApi.getPlatformAnalytics();
    return response.data;
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.analytics;
        state.engagementMetrics = action.payload.metrics;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      })
      .addCase(fetchPlatformAnalytics.fulfilled, (state, action) => {
        state.platformAnalytics = action.payload;
      });
  }
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;