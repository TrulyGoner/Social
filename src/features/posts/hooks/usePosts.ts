import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import {
  createPost,
  updatePost,
  deletePost,
  fetchPosts,
  selectPosts,
  selectPostsLoading,
  selectPostsError
} from '../../../store/slices/postsSlice';
import { CreatePostData, UpdatePostData, PostFilters } from '../types/post.types';

export const usePosts = () => {
  const dispatch = useAppDispatch();
  
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);

  const createNewPost = useCallback((postData: CreatePostData) => {
    return dispatch(createPost(postData));
  }, [dispatch]);

  const updateExistingPost = useCallback((postData: UpdatePostData) => {
    return dispatch(updatePost(postData));
  }, [dispatch]);

  const removePost = useCallback((postId: string) => {
    return dispatch(deletePost(postId));
  }, [dispatch]);

  const loadPosts = useCallback((filters: PostFilters = {}) => {
    return dispatch(fetchPosts(filters));
  }, [dispatch]);

  const publishPost = useCallback(async (postId: string) => {
    // Implement publish logic
    const updatedPost = { id: postId, status: 'published' as const };
    return dispatch(updatePost(updatedPost));
  }, [dispatch]);

  const schedulePost = useCallback((postId: string, scheduledFor: string) => {
    const updatedPost = {
      id: postId,
      status: 'scheduled' as const,
      scheduledFor
    };
    return dispatch(updatePost(updatedPost));
  }, [dispatch]);

  return {
    posts,
    loading,
    error,
    createPost: createNewPost,
    updatePost: updateExistingPost,
    deletePost: removePost,
    fetchPosts: loadPosts,
    publishPost,
    schedulePost
  };
};
