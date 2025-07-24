import React, { useState } from 'react';
import { Calendar, Heart, Share2, MessageCircle, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Modal } from '../../../components/ui/modal';
import { Post } from '../types/post.types';
import { usePosts } from '../hooks/usePosts';
import { formatDate, formatNumber } from '../../../utils/helpers/formatters';
import { getPlatformColor, getStatusColor } from '../../../utils/helpers/uiHelpers';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { deletePost, updatePost } = usePosts();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    await deletePost(post.id);
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePublish = async () => {
    await updatePost({
      id: post.id,
      status: 'published'
    });
  };

  return (
    <>
      <Card hover className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`} />
            <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
              {post.platform}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
              {post.status}
            </span>
          </div>
          
          {/* Actions Menu */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              icon={Edit}
              onClick={handleEdit}
              aria-label="Edit post"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={() => setShowDeleteModal(true)}
              className="text-red-600 hover:text-red-700"
              aria-label="Delete post"
            />
            <Button
              variant="ghost"
              size="sm"
              icon={MoreHorizontal}
              aria-label="More actions"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {post.content}
          </p>
          
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.hashtags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-blue-600 dark:text-blue-400 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Schedule Info */}
        {post.scheduledFor && post.status === 'scheduled' && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              Scheduled for {formatDate(post.scheduledFor)}
            </span>
          </div>
        )}

        {/* Engagement Stats */}
        {post.engagement && post.status === 'published' && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Heart className="h-4 w-4" />
                <span>{formatNumber(post.engagement.likes)}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Share2 className="h-4 w-4" />
                <span>{formatNumber(post.engagement.shares)}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <MessageCircle className="h-4 w-4" />
                <span>{formatNumber(post.engagement.comments)}</span>
              </div>
            </div>
            
            {post.status === 'draft' && (
              <Button
                size="sm"
                onClick={handlePublish}
              >
                Publish Now
              </Button>
            )}
          </div>
        )}

        {/* Timestamps */}
        <div className="text-xs text-gray-400 mt-2">
          Created {formatDate(post.createdAt)}
          {post.publishedAt && (
            <> • Published {formatDate(post.publishedAt)}</>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Post"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-400">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
      </Modal>
    </>
  );
};