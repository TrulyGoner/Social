import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnalyticsData, PlatformAnalytics, EngagementMetrics } from '../../features/posts/analytics/types/analytics.types';
import { analyticsApi } from '../../services/api/analytics.api';

interface AnalyticsState {
  data: AnalyticsData | null;
  platformData: any[];
  engagementTrends: any[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  platformData: [],
  engagementTrends: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (filters?: { dateFrom?: string; dateTo?: string; platform?: string }) => {
    const response = await analyticsApi.getOverview(filters);
    return response.data;
  }
);

export const fetchPlatformAnalytics = createAsyncThunk(
  'analytics/fetchPlatformAnalytics',
  async (platform: string) => {
    const response = await analyticsApi.getPlatformAnalytics(platform);
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
        state.data = action.payload.data;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch analytics';
      })
      .addCase(fetchPlatformAnalytics.fulfilled, (state, action) => {
        state.platformData = [action.payload];
      });
  }
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
