import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesModule } from './cliente/cliente.module';
import { MascotasModule } from './mascota/mascota.module';
import { VeterinariosModule } from './veterinario/veterinario.module';
import { MailModule } from './mail/mail.module';
import { RecetasModule } from './recetas/recetas.module';
import { PagoModule } from './pago/pago.module';
import { VacunasModule } from './vacunas/vacunas.module';
import { VacunacionesModule } from './vacunaciones/vacunaciones.module';
import { ConsultaModule } from './consulta/consulta.module';
import { CitaModule } from './cita/cita.module';
import { AuthModule } from './auth/auth.module';
import { FacturaModule } from './factura/factura.module';
import { HistorialMedicoModule } from './historial_medico/historial_medico.module';

// ... (tus otros imports se mantienen igual)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuración de PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Nota: Usa false en producción
    }),

    // Configuración de MongoDB (Aquí estaba el error)
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/tu_base_de_datos'),

    // Tus módulos funcionales
    ClientesModule,
    MascotasModule,
    VeterinariosModule,
    MailModule,
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