import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
type RoleType = {
  id: number;
  name: string;
};

interface JwtUserData {
  id: number;
  username: string;
  roles: RoleType[];
  permissions: string[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requireLogin) {
      return true;
    }

    const token = request.signedCookies['token'];

    if (!token) {
      throw new HttpException('登录失效', HttpStatus.BAD_REQUEST);
    }

    try {
      const data = this.jwtService.verify<JwtUserData>(token);
      request.user = {
        ...data,
      };

      return true;
    } catch (e) {
      throw new HttpException('登录失效', HttpStatus.BAD_REQUEST);
    }
  }
}
