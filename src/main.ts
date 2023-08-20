import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  await app.listen(5000, () => {
    console.log('En linea en el puerto:5000');
  });
}
bootstrap();
process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});
