import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user as any;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ username, password: hash });
    return this.usersRepository.save(user);
  }
}
