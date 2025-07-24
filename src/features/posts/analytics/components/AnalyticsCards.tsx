import React from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp, TrendingDown, Users, Heart, Share2, MessageCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { selectAnalyticsData } from '../../../store/selectors/analyticsSelectors';
import { formatNumber, formatPercentage } from '../../../utils/helpers/formatters';

export const AnalyticsCards: React.FC = () => {
  const analyticsData = useSelector(selectAnalyticsData);

  const metrics = [
    {
      name: 'Total Followers',
      value: analyticsData.totalFollowers,
      change: analyticsData.followersChange,
      icon: Users,
      color: 'blue'
    },
    {
      name: 'Engagement Rate',
      value: formatPercentage(analyticsData.engagementRate),
      change: analyticsData.engagementChange,
      icon: Heart,
      color: 'pink'
    },
    {
      name: 'Total Shares',
      value: analyticsData.totalShares,
      change: analyticsData.sharesChange,
      icon: Share2,
      color: 'green'
    },
    {
      name: 'Comments',
      value: analyticsData.totalComments,
      change: analyticsData.commentsChange,
      icon: MessageCircle,
      color: 'purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        const isPositive = metric.change >= 0;
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        
        return (
          <Card key={metric.name}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.name}
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {formatNumber(metric.value)}
                </p>
                <div className={`flex items-center mt-1 text-sm ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {formatPercentage(Math.abs(metric.change))}
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${metric.color}-50 dark:bg-${metric.color}-900`}>
                <Icon className={`h-6 w-6 text-${metric.color}-600 dark:text-${metric.color}-400`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};