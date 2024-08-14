import { PartialType } from '@nestjs/swagger';
// @ts-ignore
import { CreateFileManagerDto } from './create-file-manager.dto';

export class UpdateFileManagerDto extends PartialType(CreateFileManagerDto) {}
