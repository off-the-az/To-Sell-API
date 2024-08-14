import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FileManagerService } from './file-manager.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/files')
export class FileManagerController {
  constructor(private readonly fileManagerService: FileManagerService) {}

  @Post('add/:dir')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .addMaxSizeValidator({
          maxSize: 4096000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Param('dir') dir: string,
  ) {
    return this.fileManagerService.create(file, dir);
  }

  @Get('get/:dest/:dir/:name')
  find(
    @Param('dest') dest: string, // The name of the destination. Ex.: Products
    @Param('dir') dir: string,
    @Param('name') name: string,
    @Res() res,
  ) {
    this.fileManagerService.find(dest, dir, name, res);
  }

  @Delete('remove/:dir/:name')
  remove(@Param('name') name: string, @Param('dir') dir: string) {
    return this.fileManagerService.remove(name, dir);
  }
}
