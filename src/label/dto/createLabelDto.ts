import { IsString } from 'class-validator';

export class CreatLabelDto {
  @IsString({
    message: '标签名必须为字符串',
  })
  name: string;
}
