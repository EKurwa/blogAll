import { request } from '@umijs/max';
export type Labels = {
  id: number;
  name: string;
};

export interface Article {
  id: number;
  title: string;
  content: string;
  status: number | string;
  labels: number[] | Labels[];
  createTime: string;
  updateTime: string;
}

export interface AddArticle {
  title: string;
  content: string;
  status: number;
  labels: number[];
}

export interface UpdateArticle extends Partial<AddArticle> {
  id: number;
}

export interface SearchArticle {
  page?: number;
  pageSize?: number;
  labels?: number[];
  keyword?: string;
  status?: number;
}

export const createArticle = async (data: AddArticle) => {
  return await request(`/article/create`, {
    method: 'POST',
    data,
  });
};

export const updateArticle = async (data: UpdateArticle) => {
  return await request(`/article/update`, {
    method: 'POST',
    data,
  });
};

export const getArticleDetail = async (id: number) => {
  return await request(`/article/${id}`, {
    method: 'GET',
  });
};

export const getArticleList = async (params?: SearchArticle) => {
  const defaultParams: SearchArticle = { page: 1, pageSize: 10 };
  const mergedParams = { ...defaultParams, ...params };
  return await request(`/article/list`, {
    method: 'GET',
    params: mergedParams,
  });
};
