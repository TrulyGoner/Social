import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AnalyticsCards } from '../features/posts/analytics/components/AnalyticsCards';
import { PostCard } from '../features/posts/components/postCard';
import { fetchPosts } from '../store/slices/postsSlice';
import { selectPosts, selectPostsLoading } from '../store/slices/postsSlice';
import { Plus, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts({ limit: 5 }));
  }, [dispatch]);

  const recentPosts = posts.slice(0, 5);

  const stats = [
    {
      title: 'Total Posts',
      value: '42',
      change: '+12%',
      icon: BarChart3,
      color: 'text-blue-600',
    },
    {
      title: 'Engagement Rate',
      value: '5.8%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Followers',
      value: '2.4K',
      change: '+8.2%',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Scheduled',
      value: '12',
      change: '+4',
      icon: Calendar,
      color: 'text-orange-600',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Welcome back! Here's your social media overview.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Post
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Analytics Overview */}
        <AnalyticsCards />

        {/* Recent Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Posts
              </h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                recentPosts.map((post) => (
                  <PostCard key={post.id} post={post} compact />
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Accounts
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
