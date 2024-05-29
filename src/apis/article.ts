import request from ".";

// 获取文章列表
export const getArticleList = (params: { page: number; pageSize: number }) => {
  return request({
    url: "/client/article/list",
    method: "get",
    params,
  });
};

// 获取文章详情
export const getArticleDetail = (id: number) => {
  return request({
    url: `/client/article/${id}`,
    method: "get",
  });
};
