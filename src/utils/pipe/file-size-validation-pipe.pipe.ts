import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (value.size > 1024 * 1024 * 1) {
      throw new HttpException('文件大于 1MB', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
