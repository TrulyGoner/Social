import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
