import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

export class UpdateArticleDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @IsNumber()
  id: number;

  @ValidateIf((UpdateArticleDto) => (UpdateArticleDto.title ? true : false))
  @Length(6, 24, {
    message: '标题长度为6-24',
  })
  title: string;

  @ValidateIf((UpdateArticleDto) => (UpdateArticleDto.content ? true : false))
  @IsString({
    message: '内容必须为字符串',
  })
  content: string;

  @ValidateIf((UpdateArticleDto) => (UpdateArticleDto.status ? true : false))
  @IsNumber({}, { message: '状态必须为数字' })
  status: number;

  @ValidateIf((UpdateArticleDto) => (UpdateArticleDto.labels ? true : false))
  @IsNumber(
    {},
    {
      message: '分类必须为数字',
      each: true,
    },
  )
  labels: number[];
}
