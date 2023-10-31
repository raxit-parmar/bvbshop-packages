import { fetch } from '../../Utils/helper';

export const getPosts = async ({
  blogId,
  cache = true,
  queryParams = {},
  apiInstance = null,
}: {
  blogId: string;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post`, { queryParams, cache, apiInstance });
};

export const getPostDetail = async ({
  blogId,
  postId,
  cache = true,
  queryParams = {},
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}`, { queryParams, cache, apiInstance });
};

export const getRelatedPosts = async ({
  blogId,
  postId,
  payload = {},
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  payload;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/relatedPosts`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const getComments = async ({
  blogId,
  postId,
  cache = true,
  queryParams = {},
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/comment`, { queryParams, cache, apiInstance });
};

export const createComment = async ({
  blogId,
  postId,
  payload,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  payload: any;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/comment`, {
    method: 'POST',
    body: payload,
    apiInstance,
  });
};

export const likePost = async ({
  blogId,
  postId,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/like`, {
    method: 'POST',
    apiInstance,
  });
};

export const removeLikePost = async ({
  blogId,
  postId,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/like`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const likeComment = async ({
  blogId,
  postId,
  commentId,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  commentId: string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/comment/${commentId}/like`, {
    method: 'POST',
    apiInstance,
  });
};

export const removeLikeComment = async ({
  blogId,
  postId,
  commentId,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  commentId: string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/comment/${commentId}/like`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const dislikeComment = async ({
  blogId,
  postId,
  commentId,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  commentId: string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/comment/${commentId}/dislike`, {
    method: 'POST',
    apiInstance,
  });
};

export const removeDislikeComment = async ({
  blogId,
  postId,
  commentId,
  apiInstance = null,
}: {
  blogId: string;
  postId: string;
  commentId: string;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/${blogId}/post/${postId}/comment/${commentId}/dislike`, {
    method: 'DELETE',
    apiInstance,
  });
};

export const getPostCatalogs = async ({
  catalogId,
  cache = true,
  queryParams = {},
  apiInstance = null,
}: {
  catalogId: string;
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/postCatalogs/${catalogId}`, { queryParams, cache, apiInstance });
};
