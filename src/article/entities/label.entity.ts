import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Article } from './article.entity';

@Entity({
  name: 'label', // 表名
})
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '标签名',
  })
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToMany(() => Article, (article) => article.labels)
  articles: Article[];
}
