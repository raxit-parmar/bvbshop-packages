import { fetch, removeEmpty } from '../../Utils/helper';

export const getBlogs = async ({
  cache = true,
  queryParams = {},
  apiInstance = null,
}: {
  queryParams?: any;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog`, { queryParams, cache, apiInstance });
};

export const getBlogDetail = async ({
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
  return await fetch(`/blog/${blogId}`, { queryParams, cache, apiInstance });
};

export const getBlogTags = async ({
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
  return await fetch(`/blog/getTagsByBlog/${blogId}`, { queryParams, cache, apiInstance });
};

export const getTagDetail = async ({
  blogId,
  tagId,
  cache = true,
  apiInstance = null,
}: {
  blogId: string;
  tagId: string;
  cache?: boolean;
  apiInstance?: any;
}): Promise<any> => {
  return await fetch(`/blog/getTagById/${blogId}/${tagId}`, { cache, apiInstance });
};
