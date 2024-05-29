import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Label } from 'src/article/entities/label.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabelService {
  @InjectRepository(Label)
  private readonly labelRepository: Repository<Label>;

  // 创建标签
  async createLabel(name: string) {
    const foundName = await this.labelRepository.findOne({
      where: { name: name.toLowerCase() },
    });
    if (foundName) {
      throw new HttpException('标签已存在', HttpStatus.BAD_REQUEST);
    }
    await this.labelRepository.insert({ name: name.toLowerCase() });
  }

  // 修改标签名
  async updateLabel(id: number, name: string) {
    const foundName = await this.labelRepository.findOne({
      where: { id, name },
      relations: ['articles'],
    });

    if (foundName) {
      throw new HttpException('标签已存在', HttpStatus.BAD_REQUEST);
    }
    if (foundName && foundName.articles.length > 0) {
      throw new HttpException('标签已被使用', HttpStatus.BAD_REQUEST);
    }

    await this.labelRepository.update(id, { name: name.toLowerCase() });
  }

  // 获取全部标签
  async getLabelAll() {
    const foundLabels = await this.labelRepository.find({
      relations: ['articles'],
    });
    if (!foundLabels) {
      return [];
    }
    return foundLabels.map((label) => {
      return {
        ...label,
        articles: label.articles.length,
      };
    });
  }
}
