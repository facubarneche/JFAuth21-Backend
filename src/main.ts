import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.info(`Running on port 3000`);
}
bootstrap();
