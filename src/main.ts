import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'))

  app.enableCors({
    origin: ['http://localhost:5173', 'https://bades-manager.onrender.com/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });

  //Configuration de swaegger
  const config = new DocumentBuilder()
    .setTitle('MAQUETTE ORBITAL API')
    .setDescription("Description de l'API")
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Utilisation des pipes

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
