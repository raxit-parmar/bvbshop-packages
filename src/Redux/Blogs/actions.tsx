export const FETCH_BLOGS = 'FETCH_BLOGS';
export const FETCH_BLOGS_STARTED = 'FETCH_BLOGS_STARTED';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAIL = 'FETCH_BLOGS_FAIL';
export const FETCH_BLOGS_RESET = 'FETCH_BLOGS_RESET';

export const fetchBlogs = (data: any) => ({
  type: FETCH_BLOGS,
  payload: data,
});

export const fetchBlogsStarted = () => ({
  type: FETCH_BLOGS_STARTED,
});

export const fetchBlogsSuccess = (data: any) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: data,
});

export const fetchBlogsFail = (error: any) => ({
  type: FETCH_BLOGS_FAIL,
  payload: error,
});

export const fetchBlogsReset = () => ({
  type: FETCH_BLOGS_RESET,
});

export const FETCH_BLOG = 'FETCH_BLOG';
export const FETCH_BLOG_STARTED = 'FETCH_BLOG_STARTED';
export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS';
export const FETCH_BLOG_FAIL = 'FETCH_BLOG_FAIL';
export const FETCH_BLOG_RESET = 'FETCH_BLOG_RESET';

export const fetchBlog = (data: any) => ({
  type: FETCH_BLOG,
  payload: data,
});

export const fetchBlogStarted = () => ({
  type: FETCH_BLOG_STARTED,
});

export const fetchBlogSuccess = (data: any) => ({
  type: FETCH_BLOG_SUCCESS,
  payload: data,
});

export const fetchBlogFail = (error: any) => ({
  type: FETCH_BLOG_FAIL,
  payload: error,
});

export const fetchBlogReset = () => ({
  type: FETCH_BLOG_RESET,
});
