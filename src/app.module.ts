import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { ClientesModule } from './cliente/cliente.module';
import { MascotasModule } from './mascota/mascota.module';
import { VeterinariosModule } from './veterinario/veterinario.module';
import { MailModule } from './mail/mail.module';

import { RecetasModule } from './recetas/recetas.module';
import { VacunasModule } from './vacunas/vacunas.module';
import { VacunacionesModule } from './vacunaciones/vacunaciones.module';

import { ConsultaModule } from './consulta/consulta.module';
import { CitaModule } from './cita/cita.module';
<<<<<<< HEAD
import { MedicamentosModule } from './medicamentos/medicamentos.module';
=======
import { AuthModule } from './auth/auth.module';
>>>>>>> 251ea98a72caa9f1d20c832e10add3977570516d

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
      // ssl: { rejectUnauthorized: false },
    }),
<<<<<<< HEAD
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/adoptiondb'),
=======

    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/adoptiondb',
    ),

    ClientesModule,
    MascotasModule,
    VeterinariosModule,
    MailModule,

    RecetasModule,
    VacunasModule,
    VacunacionesModule,

>>>>>>> 251ea98a72caa9f1d20c832e10add3977570516d
    ConsultaModule,
    CitaModule,
    AuthModule,
    MedicamentosModule,
  ],
})
export class AppModule {}
