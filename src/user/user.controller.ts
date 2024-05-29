import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { UserVo } from './vo/user.vo';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    await this.userService.register(registerUser);
    return '';
  }

  @Post('login')
  async login(
    @Body() loginUser: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const userData = await this.userService.login(loginUser);

    const permissions: string[] = [];
    const roles = userData.roles.map((role) => {
      role.permissions.forEach((permission) => {
        permissions.push(permission.code);
      });
      return {
        id: role.id,
        name: role.name,
      };
    });
    const token = this.jwtService.sign({
      id: userData.id,
      username: userData.username,
      roles,
      permissions,
    });

    // 设置cookie
    response.cookie('token', token, {
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return new UserVo({
      id: userData.id,
      username: userData.username,
      nickName: userData.nickName || '',
      email: userData.email || '',
      avatar: userData.headPic || '',
      phoneNumber: userData.phoneNumber || '',
      createTime: userData.createTime,
      roles,
      permissions,
    });
  }
}
