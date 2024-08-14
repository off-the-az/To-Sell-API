import { NestFactory } from '@nestjs/core';
import { SiteConstructorModule } from './site-constructor.module';

async function bootstrap() {
  const app = await NestFactory.create(SiteConstructorModule);
  await app.listen(8175);
}
bootstrap();
