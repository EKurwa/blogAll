import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreatArticleDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @Length(6, 24, {
    message: '标题长度为6-24',
  })
  title: string;

  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;

  @IsNotEmpty({
    message: '状态不能为空',
  })
  @IsNumber({}, { message: '状态必须为数字' })
  status: number;

  @IsNotEmpty({
    message: '分类不能为空',
  })
  @IsNumber(
    {},
    {
      message: '分类必须为数字',
      each: true,
    },
  )
  labels: number[];
}
