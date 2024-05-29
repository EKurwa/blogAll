import { Module } from '@nestjs/common';
import { ClientTouristService } from './client-tourist.service';
import { ClientTouristController } from './client-tourist.controller';
import { ArticleService } from 'src/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/article/entities/article.entity';
import { Label } from 'src/article/entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Label])],
  controllers: [ClientTouristController],
  providers: [ClientTouristService, ArticleService],
})
export class ClientTouristModule {}
