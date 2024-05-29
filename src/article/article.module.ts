import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Label } from './entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Label])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
