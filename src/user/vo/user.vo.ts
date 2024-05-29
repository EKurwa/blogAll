interface RolesType {
  id: number;
  name: string;
}

export class UserVo {
  id: number;
  username: string;
  nickName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  createTime: Date;
  roles: RolesType[];
  permissions: string[];

  constructor(partial: Partial<UserVo>) {
    Object.assign(this, partial);
  }
}
