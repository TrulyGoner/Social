import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  User, 
  Bell, 
  Shield, 
  Link, 
  Palette, 
  Database,
  Download,
  Upload,
  Trash2,
  Check
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'connected', label: 'Connected Accounts', icon: Link },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data & Privacy', icon: Database },
  ];

  const connectedAccounts = [
    { platform: 'Twitter', username: '@johndoe', connected: true, followers: '2.1K' },
    { platform: 'Instagram', username: '@johndoe_photos', connected: true, followers: '5.8K' },
    { platform: 'Facebook', username: 'John Doe', connected: false, followers: '1.2K' },
    { platform: 'LinkedIn', username: 'John Doe', connected: true, followers: '892' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1 p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </Card>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        First Name
                      </label>
                      <Input defaultValue="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <Input defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <Input type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      defaultValue="Social media manager and content creator passionate about digital marketing."
                    />
                  </div>
                  <Button>Save Changes</Button>
                </div>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                          {key} Notifications
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive notifications via {key}
                        </p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Password
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        New Password
                      </label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <Input type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Two-Factor Authentication
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add an extra layer of security to your account.
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </Card>
              </div>
            )}

            {activeTab === 'connected' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Connected Social Accounts
                </h2>
                <div className="space-y-4">
                  {connectedAccounts.map((account) => (
                    <div
                      key={account.platform}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                          account.platform === 'Twitter' ? 'bg-twitter' :
                          account.platform === 'Instagram' ? 'bg-instagram' :
                          account.platform === 'Facebook' ? 'bg-facebook' :
                          'bg-linkedin'
                        }`}>
                          {account.platform[0]}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {account.platform}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {account.username} • {account.followers} followers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {account.connected ? (
                          <>
                            <span className="flex items-center gap-1 text-green-600 text-sm">
                              <Check className="w-4 h-4" />
                              Connected
                            </span>
                            <Button variant="outline" size="sm">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button size="sm">Connect</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'appearance' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Appearance Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Theme
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['Light', 'Dark', 'System'].map((theme) => (
                        <button
                          key={theme}
                          className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Export Data
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Download a copy of your data including posts, analytics, and account information.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Data
                  </Button>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Import Data
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Import posts and data from other social media management tools.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Import Data
                  </Button>
                </Card>

                <Card className="p-6 border-red-200 dark:border-red-800">
                  <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                    Danger Zone
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
