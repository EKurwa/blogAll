import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FileService {
  @InjectRepository(File)
  private readonly fileRepository: Repository<File>; // 注入File实体类的Repository

  async createFile(files: any) {
    try {
      for (const file of files) {
        const fileInfo = new File();
        fileInfo.filename = file.filename;
        fileInfo.size = file.size;
        fileInfo.type = file.mimetype;

        await this.fileRepository.save(fileInfo); // 使用Repository的save方法保存文件信息
      }
    } catch (error) {
      throw new HttpException('文件保存失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
