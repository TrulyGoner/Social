import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

export const selectAnalyticsState = (state: RootState) => state.analytics;

export const selectAnalyticsData = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.data || {
    totalFollowers: 0,
    followersChange: 0,
    engagementRate: 0,
    engagementChange: 0,
    totalShares: 0,
    sharesChange: 0,
    totalComments: 0,
    commentsChange: 0,
    totalPosts: 0,
    postsChange: 0,
  }
);

export const selectAnalyticsLoading = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.loading
);

export const selectAnalyticsError = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.error
);

export const selectPlatformAnalytics = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.platformData || []
);

export const selectEngagementTrends = createSelector(
  [selectAnalyticsState],
  (analytics) => analytics.engagementTrends || []
);
