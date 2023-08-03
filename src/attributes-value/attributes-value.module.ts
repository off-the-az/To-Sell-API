import { Module } from '@nestjs/common';
import { AttributesValueService } from './attributes-value.service';
import { AttributesValueController } from './attributes-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesValue } from './entities/attributes-value.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttributesValue])],
  controllers: [AttributesValueController],
  providers: [AttributesValueService]
})
export class AttributesValueModule {}
