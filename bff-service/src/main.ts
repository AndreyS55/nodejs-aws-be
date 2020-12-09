import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

const port = config.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap().then(() => {
  console.log('App is running on %s port', port);
});
