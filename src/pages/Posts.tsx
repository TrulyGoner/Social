import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { PostCard } from '../features/posts/components/postCard';
import { usePosts } from '../features/posts/hooks/usePosts';
import { fetchPosts, setFilters, clearFilters } from '../store/slices/postsSlice';
import { selectPosts, selectPostsLoading, selectPostsFilters } from '../store/slices/postsSlice';
import { POST_STATUS, SOCIAL_PLATFORMS } from '../utils/constants/config';
import { Plus, Search, Filter, RefreshCw } from 'lucide-react';

export const PostsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const filters = useAppSelector(selectPostsFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const { createPost, updatePost, deletePost } = usePosts();

  useEffect(() => {
    dispatch(fetchPosts(filters));
  }, [dispatch, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(setFilters({ search: query }));
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    dispatch(setFilters({ status: (status as any) || undefined }));
  };

  const handlePlatformFilter = (platform: string) => {
    setSelectedPlatform(platform);
    dispatch(setFilters({ platform: (platform as any) || undefined }));
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedPlatform('');
    dispatch(clearFilters());
  };

  const handleRefresh = () => {
    dispatch(fetchPosts(filters));
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: POST_STATUS.DRAFT, label: 'Draft' },
    { value: POST_STATUS.SCHEDULED, label: 'Scheduled' },
    { value: POST_STATUS.PUBLISHED, label: 'Published' },
    { value: POST_STATUS.FAILED, label: 'Failed' },
  ];

  const platformOptions = [
    { value: '', label: 'All Platforms' },
    { value: SOCIAL_PLATFORMS.TWITTER, label: 'Twitter' },
    { value: SOCIAL_PLATFORMS.INSTAGRAM, label: 'Instagram' },
    { value: SOCIAL_PLATFORMS.FACEBOOK, label: 'Facebook' },
    { value: SOCIAL_PLATFORMS.LINKEDIN, label: 'LinkedIn' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Posts
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your social media posts and content.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={selectedPlatform}
              onChange={(e) => handlePlatformFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {platformOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button variant="outline" onClick={handleClearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>

            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </Card>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-6 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </Card>
            ))
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by creating your first post.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onUpdate={updatePost}
                onDelete={deletePost}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};
