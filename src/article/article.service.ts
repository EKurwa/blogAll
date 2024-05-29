import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatArticleDto } from './dto/creatArticleDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Like, Repository } from 'typeorm';
import { Label } from './entities/label.entity';
import { UpdateArticleDto } from './dto/updateArticleDto';

@Injectable()
export class ArticleService {
  @InjectRepository(Article)
  private readonly articleRepository: Repository<Article>;
  @InjectRepository(Label)
  private readonly labelRepository: Repository<Label>;

  // 创建文章
  async createArticle(article: CreatArticleDto) {
    const foundLabels = await this.isLabelValid(article.labels);
    try {
      const newArticle = this.articleRepository.create({
        title: article.title,
        content: article.content,
        labels: foundLabels,
        status: article.status,
      });
      await this.articleRepository.save(newArticle);
      return;
    } catch (error) {
      throw new HttpException('创建文章失败', HttpStatus.BAD_REQUEST);
    }
  }

  // 修改文章
  async updateArticle(article: UpdateArticleDto) {
    const foundArticle = await this.isArticleExist(article.id);
    let foundLabels = [];
    if (article.labels) {
      foundLabels = await this.isLabelValid(article.labels);
    }
    try {
      const newArticle = this.articleRepository.create({
        id: foundArticle.id,
        title: article.title ? article.title : foundArticle.title,
        content: article.content ? article.content : foundArticle.content,
        labels: article.labels ? foundLabels : foundArticle.labels,
        status: article.status,
      });
      await this.articleRepository.save(newArticle);
      return;
    } catch (error) {
      throw new HttpException('创建文章失败', HttpStatus.BAD_REQUEST);
    }
  }

  // 列表查询
  async getArticleList(
    page: number,
    pageSize: number,
    labels?: number[] | number,
    keyword?: string,
    status?: number,
  ) {
    const skipCount = (page - 1) * pageSize;
    const condition: Record<string, any> = {};
    if (labels) {
      if (Object.prototype.toString.call(labels) === '[object Array]') {
        condition.label = {
          id: In(labels as number[]),
        };
      } else {
        condition.labels = {
          id: labels,
        };
      }
    }

    if (keyword) {
      condition.title = Like(`%${keyword}%`);
    }
    if (status) {
      if (![-1, 0, 1].includes(Number(status))) {
        throw new HttpException('status参数错误', HttpStatus.BAD_REQUEST);
      }
      condition.status = status;
    }

    try {
      const [articles, totalCount] = await this.articleRepository.findAndCount({
        skip: skipCount,
        take: pageSize,
        select: ['id'],
        where: {
          ...condition,
        },
        relations: ['labels'],
      });
      // 获取到所有id
      const ids = articles.map((article: Article) => {
        return article.id;
      });
      const articlesAndLabels = await this.articleRepository.find({
        where: {
          id: In(ids),
        },
        relations: ['labels'],
      });

      return {
        articles: articlesAndLabels.map((articlesAndLabel: Article) => {
          return {
            ...articlesAndLabel,
            labels: articlesAndLabel.labels.map((label: Label) => {
              return {
                id: label.id,
                name: label.name,
              };
            }),
          };
        }),
        totalCount,
      };
    } catch (error) {
      throw new HttpException('查询文章列表失败', HttpStatus.BAD_REQUEST);
    }
  }

  // 获取文章详情
  async getArticleDetail(id: number, status?: number) {
    const foundArticle = await this.isArticleExist(id);
    // 客户端时只允许用户加载指定status的数据

    if (status) {
      if (foundArticle.status !== status) {
        return [];
      }
    }
    return {
      ...foundArticle,
      labels: foundArticle.labels.map((label: Label) => {
        return {
          id: label.id,
          name: label.name,
        };
      }),
    };
  }

  /**
   * 判断标签是否合法
   * @param {number[]} labels 标签数组
   * @returns {Label[]} 数据库标签实例数组
   */
  private async isLabelValid(labels: number[]) {
    if (labels.length === 0) {
      throw new HttpException('标签不能为空', HttpStatus.BAD_REQUEST);
    }
    const foundLabels = await this.labelRepository.findBy({
      id: In(labels),
    });

    if (foundLabels.length !== labels.length) {
      throw new HttpException('标签不存在', HttpStatus.BAD_REQUEST);
    }
    return foundLabels;
  }

  /**
   * 判断文章是否存在
   * @param {number} id 文章id
   * @returns {Article} 文章实例
   */
  private async isArticleExist(id: number) {
    const foundArticle = await this.articleRepository.findOne({
      where: {
        id,
      },
      relations: ['labels'],
    });
    if (!foundArticle) {
      throw new HttpException('文章不存在', HttpStatus.BAD_REQUEST);
    }
    return foundArticle;
  }
}
