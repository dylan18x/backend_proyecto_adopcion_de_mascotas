import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdopcionesModule } from './adopciones/adopciones.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './cliente/cliente.module';
import { MascotasModule } from './mascota/mascota.module';
import { Veterinario } from './veterinario/veterinario.entity';
import { VeterinariosModule } from './veterinario/veterinario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      //ssl: { rejectUnauthorized: false },
    }),AdopcionesModule,
    ClientesModule,
    MascotasModule,
    VeterinariosModule
    ],

})
export class AppModule {}
