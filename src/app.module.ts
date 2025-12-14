import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PagoModule } from './pago/pago.module';
import { FacturaModule } from './factura/factura.module';
import { HistorialMedicoModule } from './historial_medico/historial_medico.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'adopcion_mascotas',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: false,
    }),
    PagoModule,
    FacturaModule,
    HistorialMedicoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
