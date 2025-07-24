interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }
  
  interface ApiError {
    message: string;
    status: number;
    code?: string;
  }
  
  class ApiClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
      this.defaultHeaders = {
        'Content-Type': 'application/json',
      };
    }
  
    private async request<T>(
      endpoint: string,
      options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
      const url = `${this.baseURL}${endpoint}`;
      
      const config: RequestInit = {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      };
  
      // Add auth token if available
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
  
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new ApiError(
            errorData.message || `HTTP error! status: ${response.status}`,
            response.status,
            errorData.code
          );
        }
  
        const data = await response.json();
        return {
          data,
          status: response.status,
        };
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        
        throw new ApiError(
          error instanceof Error ? error.message : 'Network error',
          0
        );
      }
    }
  
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
      return this.request<T>(endpoint, { method: 'GET' });
    }
  
    async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
      return this.request<T>(endpoint, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      });
    }
  
    async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
      return this.request<T>(endpoint, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
      });
    }
  
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
      return this.request<T>(endpoint, { method: 'DELETE' });
    }