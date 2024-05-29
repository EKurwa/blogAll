import { request } from '@umijs/max';

interface UserLoginParams {
  username: string;
  password: string;
}

export const userLogin = async (data: UserLoginParams) => {
  return await request(`/user/login`, {
    method: 'POST',
    data,
  });
};
