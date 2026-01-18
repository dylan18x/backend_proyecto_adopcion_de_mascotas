import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core'; 
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; 
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  const reflector = app.get(Reflector);

  app.useGlobalGuards(
    new JwtAuthGuard(reflector), 
    new RolesGuard(reflector)
  );

  await app.listen(3000);
  console.log('Servidor corriendo en http://localhost:3000');
}
bootstrap();