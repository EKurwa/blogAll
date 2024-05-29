import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './utils/guard/login.guard';
import { JwtModule } from '@nestjs/jwt';
import { PermissionGuard } from './utils/guard/permission.guard';
import { ArticleModule } from './article/article.module';
import { FileModule } from './file/file.module';
import { entities } from './config';
import { LabelModule } from './label/label.module';
import { ClientTouristModule } from './client-tourist/client-tourist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789@',
      database: 'blog',
      synchronize: true,
      logging: true,
      entities,
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: '76EbEt6xhhyf:fk',
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
    }),
    UserModule,
    ArticleModule,
    FileModule,
    LabelModule,
    ClientTouristModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
