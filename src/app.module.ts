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
import { AuthModule } from './auth/auth.module';

import { PagoModule } from './pago/pago.module';
import { FacturaModule } from './factura/factura.module';
<<<<<<< HEAD
import { HistorialMedicoModule } from './historial_medico/historial-medico.module';
=======
import { HistorialMedicoModule } from './historial_medico/historial_medico.module';
>>>>>>> ae5a2eb2900d50aca5d01410c5def00ce708f4ee
import { MedicamentosModule } from './medicamentos/medicamentos.module';

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
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/adoptiondb',
    ),

    ClientesModule,
    MascotasModule,
    VeterinariosModule,
    MailModule,
    MedicamentosModule,
    RecetasModule,
    VacunasModule,
    VacunacionesModule,

    ConsultaModule,
    CitaModule,
    AuthModule,

    PagoModule,
    FacturaModule,
    HistorialMedicoModule,
  ],
})
export class AppModule {}
