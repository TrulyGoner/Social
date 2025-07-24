import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Dashboard } from './pages/Dashboard';
import { PostsPage } from './pages/Posts';
import { AnalyticsPage } from './pages/Analytics';
import { SettingsPage } from './pages/Settings';
import { ROUTES } from './utils/constants/config';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
              <Route path={ROUTES.dashboard} element={<Dashboard />} />
              <Route path={ROUTES.posts} element={<PostsPage />} />
              <Route path={ROUTES.analytics} element={<AnalyticsPage />} />
              <Route path={ROUTES.settings} element={<SettingsPage />} />
              <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
