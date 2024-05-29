import {
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/storage';
import { RequireLogin } from 'src/utils/decorator/custom.decorator';

@Controller('file')
@RequireLogin()
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  async uploadAnyFiles(
    @UploadedFiles(
      new ParseFilePipe({
        exceptionFactory: (errors) => {
          console.log(errors);
          return new HttpException(
            '文件类型或大小错误',
            HttpStatus.BAD_REQUEST,
          );
        },
        validators: [
          new FileTypeValidator({ fileType: /(jpeg|jpg|png|gif)$/ }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    if (!files) {
      throw new HttpException('文件上传失败', HttpStatus.BAD_REQUEST);
    }
    await this.fileService.createFile(files);

    return files.map((file) => {
      return {
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      };
    });
  }
}
