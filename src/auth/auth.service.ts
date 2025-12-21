import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity'; 
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { username } });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { 
      username: user.username, 
      sub: user.id, 
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string, role?: UserRole) {
    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.usersRepository.create({ 
      username, 
      password: hashedPassword, 
      role 
    });

    const savedUser = await this.usersRepository.save(newUser);

    const { password: _, ...result } = savedUser;
    return result;
  }
}