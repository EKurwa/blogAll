import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Label } from './label.entity';

@Entity({
  name: 'article', // 表名
})
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '文章标题',
  })
  title: string;

  @Column({
    type: 'longtext',
    comment: '文章内容',
  })
  content: string;

  @ManyToMany(() => Label, (label) => label.articles)
  @JoinTable({
    name: 'article_label',
  })
  labels: Label[];

  @Column({
    comment: '文章状态 1:正常 0:暂存 -1:锁定',
  })
  status: number;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}
