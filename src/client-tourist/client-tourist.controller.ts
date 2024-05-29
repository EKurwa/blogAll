import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ClientTouristService } from './client-tourist.service';
import { ArticleService } from 'src/article/article.service';

@Controller('client')
export class ClientTouristController {
  constructor(
    private readonly clientTouristService: ClientTouristService,
    private readonly articleService: ArticleService,
  ) {}

  @Get('article/list')
  async getArticleList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pagesize', new DefaultValuePipe(5), ParseIntPipe) size: number,
    @Query('labels') labels?: number[] | number,
    @Query('keyword') keyword?: string,
  ) {
    return await this.articleService.getArticleList(
      page,
      size,
      labels,
      keyword,
      1,
    );
  }

  @Get('article/:id')
  async getArticleDetail(@Param('id') id: number) {
    return await this.articleService.getArticleDetail(id, 1);
  }
}
