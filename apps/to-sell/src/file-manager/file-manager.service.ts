import { Injectable, StreamableFile } from '@nestjs/common';
import * as fs from 'fs';
import path, { join } from 'path';

@Injectable()
export class FileManagerService {
  create(file: Express.Multer.File, dir: string) {
    const fileName = Math.random() + '.png';
    if (!fs.existsSync(process.cwd() + '/uploads/' + dir))
      fs.mkdirSync(process.cwd() + '/uploads/' + dir);
    fs.writeFileSync(
      process.cwd() + '/uploads/' + dir + '/' + fileName,
      file.buffer,
    );
    return 'http://localhost:3000/api/files/get/' + dir + '/' + fileName;
  }

  find(dest: string, dir: string, name: string, res: any) {
    const file = fs.createReadStream(
      join(process.cwd() + '/uploads/' + dest + '/' + dir, name),
    );
    file.pipe(res);
  }

  remove(name: string, dir: string) {
    fs.rmSync(process.cwd() + '/uploads/' + dir + '/' + name);
    return `${name} is removed`;
  }
}
