import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, CreatePostData, UpdatePostData, PostFilters } from '../../features/posts/types/post.types';
import { postsApi } from '../../services/api/posts.api';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: string | null;
  filters: PostFilters;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
  currentPage: 1,
  pageSize: 10
};

// Async Thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (filters: PostFilters = {}, { rejectWithValue }) => {
    try {
      const response = await postsApi.getPosts(filters);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData: CreatePostData, { rejectWithValue }) => {
    try {
      const response = await postsApi.createPost(postData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (postData: UpdatePostData, { rejectWithValue }) => {
    try {
      const response = await postsApi.updatePost(postData.id, postData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      await postsApi.deletePost(postId);
      return postId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<PostFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Posts
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.posts;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Post
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.totalCount += 1;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Post
    builder
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });

    // Delete Post
    builder
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
        state.totalCount -= 1;
      });
  }
});

export const { setFilters, clearFilters, setCurrentPage } = postsSlice.actions;
export default postsSlice.reducer;

// Selectors
export const selectPosts = (state: { posts: PostsState }) => state.posts.items;
export const selectPostsLoading = (state: { posts: PostsState }) => state.posts.loading;
export const selectPostsError = (state: { posts: PostsState }) => state.posts.error;
export const selectPostsFilters = (state: { posts: PostsState }) => state.posts.filters;
