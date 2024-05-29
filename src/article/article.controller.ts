import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import {
  RequireLogin,
  RequirePermission,
} from '../utils/decorator/custom.decorator';
import { CreatArticleDto } from './dto/creatArticleDto';
import { UpdateArticleDto } from './dto/updateArticleDto';

@Controller('article')
@RequireLogin()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @RequirePermission('ARTICEL_ADD')
  async createArticle(@Body() article: CreatArticleDto) {
    if (![-1, 0, 1].includes(Number(article.status))) {
      throw new HttpException('status参数错误', HttpStatus.BAD_REQUEST);
    }
    return await this.articleService.createArticle(article);
  }

  @Post('update')
  @RequirePermission('ARTICEL_UPDATE')
  async updateArticle(@Body() article: UpdateArticleDto) {
    const { title, content, labels, status } = article;
    if (!title && !content && !labels && !status && status !== 0) {
      throw new HttpException('错误请求', HttpStatus.BAD_REQUEST);
    }
    if (![-1, 0, 1].includes(Number(article.status)) && status) {
      throw new HttpException('status参数错误', HttpStatus.BAD_REQUEST);
    }
    return await this.articleService.updateArticle(article);
  }

  @Get('list')
  async getArticleList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pagesize', new DefaultValuePipe(5), ParseIntPipe) size: number,
    @Query('labels') labels?: number[] | number,
    @Query('keyword') keyword?: string,
    @Query('status') status?: number,
  ) {
    return await this.articleService.getArticleList(
      page,
      size,
      labels,
      keyword,
      status,
    );
  }

  @Get(':id')
  async getArticleDetail(@Param('id') id: number) {
    return await this.articleService.getArticleDetail(id);
  }
}
