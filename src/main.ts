import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT ?? 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule 
    // {
    // httpsOptions: {
      // key: readFileSync(join(__dirname, '..', 'private.key')),
      // cert: readFileSync(join(__dirname, '..', 'certificate.crt')),
      // ca: readFileSync(join(__dirname, '..', 'ca_bundle.crt')),
    // },
  // }
);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  console.log('NODE_ENV', process.env.NODE_ENV);
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
