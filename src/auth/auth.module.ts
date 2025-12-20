import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

const rawExpires = process.env.JWT_EXPIRES_IN || '3600s';
let jwtExpiresIn: number | undefined;
const m = String(rawExpires).match(/^(\d+)(s|m|h|d)?$/);
if (m) {
  const n = Number(m[1]);
  const unit = m[2];
  switch (unit) {
    case 'm':
      jwtExpiresIn = n * 60;
      break;
    case 'h':
      jwtExpiresIn = n * 3600;
      break;
    case 'd':
      jwtExpiresIn = n * 86400;
      break;
    case 's':
    default:
      jwtExpiresIn = n;
      break;
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: jwtExpiresIn ? { expiresIn: jwtExpiresIn } : undefined,
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
