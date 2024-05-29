import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { Role } from './entities/role.entity';
import { LoginUserDto } from './dto/LoginUserDto';
import md5 from 'src/utils/md5';
import { Permission } from './entities/permission.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private readonly permissionRepository: Repository<Permission>;

  /**
   * 注册
   * @param {RegisterUserDto} registerUser 注册用户信息
   */
  async register(registerUser: RegisterUserDto) {
    const { username, password, roles } = registerUser;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const rolesIds = roles.map((role) => Number(role));
    const originLength = rolesIds.length;
    const newRoles = await this.roleRepository.findBy({
      id: In(rolesIds),
    });
    if (originLength !== newRoles.length) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.roles = newRoles;

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException('注册失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 登录
   * @param {LoginUserDto} loginUser 登录用户信息
   */
  async login(loginUser: LoginUserDto) {
    const { username, password } = loginUser;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.password !== md5(password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
