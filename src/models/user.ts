import { useState } from 'react';
type RolesInfo = {
  id: number;
  name: string;
};
interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  email: string;
  nickName: string;
  phoneNumber: string;
  createTime: Date;
  permissions: string[];
  roles: RolesInfo[];
}

const useUser = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  return {
    userInfo,
    setUserInfo,
  };
};

export default useUser;
