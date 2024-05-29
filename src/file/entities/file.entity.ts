import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'file',
})
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '文件名',
  })
  filename: string;

  @Column({
    comment: '文件类型',
  })
  type: string;

  @Column({
    comment: '文件大小',
  })
  size: number;

  @CreateDateColumn()
  createTime: Date;
}
