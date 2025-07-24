import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AnalyticsCards } from '../features/posts/analytics/components/AnalyticsCards';
import { TrendingUp, Users, Eye, Heart, MessageCircle, Share, Download } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: 'custom', label: 'Custom range' },
  ];

  const platformOptions = [
    { value: 'all', label: 'All Platforms' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

  const keyMetrics = [
    {
      title: 'Total Impressions',
      value: '124.5K',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-600',
    },
    {
      title: 'Engagement Rate',
      value: '5.8%',
      change: '+2.1%',
      icon: Heart,
      color: 'text-red-600',
    },
    {
      title: 'Total Likes',
      value: '8.2K',
      change: '+18.2%',
      icon: Heart,
      color: 'text-pink-600',
    },
    {
      title: 'Comments',
      value: '1.4K',
      change: '+8.7%',
      icon: MessageCircle,
      color: 'text-green-600',
    },
    {
      title: 'Shares',
      value: '892',
      change: '+15.3%',
      icon: Share,
      color: 'text-purple-600',
    },
    {
      title: 'Followers Growth',
      value: '+127',
      change: '+22.1%',
      icon: Users,
      color: 'text-indigo-600',
    },
  ];

  const topPosts = [
    {
      id: '1',
      content: 'Just launched our new feature! 🚀 Check it out and let us know what you think.',
      platform: 'twitter',
      engagement: 245,
      impressions: 5420,
      likes: 89,
      comments: 12,
      shares: 23,
    },
    {
      id: '2',
      content: 'Behind the scenes: Our team working on the latest update',
      platform: 'instagram',
      engagement: 189,
      impressions: 3890,
      likes: 156,
      comments: 8,
      shares: 15,
    },
    {
      id: '3',
      content: 'Tips for better productivity in remote work environments',
      platform: 'linkedin',
      engagement: 167,
      impressions: 2890,
      likes: 78,
      comments: 34,
      shares: 45,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your social media performance and insights.
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Platform
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {platformOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {metric.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                      {metric.value}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {metric.change} from last period
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-800 ${metric.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Analytics Charts */}
        <AnalyticsCards />

        {/* Top Performing Posts */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Posts
          </h2>
          <div className="space-y-4">
            {topPosts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="capitalize bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {post.platform}
                      </span>
                      <span>{post.impressions.toLocaleString()} impressions</span>
                      <span>{post.engagement} total engagement</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="w-4 h-4 text-green-500" />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};
