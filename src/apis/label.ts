import { request } from '@umijs/max';

export const addLabel = (data: { name: string }) => {
  return request('/label', {
    method: 'POST',
    data,
  });
};

export const getLabelAll = () => {
  return request('/label/list', {
    method: 'GET',
  });
};

export const setLabelName = (data: { id: number; name: string }) => {
  return request('/label/update', {
    method: 'POST',
    data,
  });
};
