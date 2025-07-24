import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Platform, PostStatus } from '../../features/posts/types/post.types';

export const selectPostsState = (state: RootState) => state.posts;

export const selectPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.items
);

export const selectPostsByPlatform = createSelector(
  [selectPosts, (state: RootState, platform: Platform) => platform],
  (posts, platform) => posts.filter(post => post.platform === platform)
);

export const selectPostsByStatus = createSelector(
  [selectPosts, (state: RootState, status: PostStatus) => status],
  (posts, status) => posts.filter(post => post.status === status)
);

export const selectScheduledPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter(post => 
    post.status === 'scheduled' && 
    post.scheduledFor && 
    new Date(post.scheduledFor) > new Date()
  )
);

export const selectDraftPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter(post => post.status === 'draft')
);

export const selectPublishedPosts = createSelector(
  [selectPosts],
  (posts) => posts.filter(post => post.status === 'published')
);

export const selectPostsStats = createSelector(
  [selectPosts],
  (posts) => {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.status === 'published').length;
    const scheduledPosts = posts.filter(p => p.status === 'scheduled').length;
    const draftPosts = posts.filter(p => p.status === 'draft').length;
    
    const totalEngagement = posts
      .filter(p => p.engagement)
      .reduce((acc, post) => {
        const engagement = post.engagement!;
        return acc + engagement.likes + engagement.shares + engagement.comments;
      }, 0);

    return {
      totalPosts,
      publishedPosts,
      scheduledPosts,
      draftPosts,
      totalEngagement
    };
  }
);