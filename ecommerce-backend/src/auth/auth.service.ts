import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Auth } from './entities/auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    if (
      createAuthDto.role === 'admin' &&
      createAuthDto.adminCode !==
        'ADMIN123'
    ) {
      throw new UnauthorizedException(
        'Invalid admin code',
      );
    }

    const hashedPassword = await bcrypt.hash(
      createAuthDto.password,
      10,
    );

    const user = this.authRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });

    const savedUser =
      await this.authRepository.save(user);

    const token = this.jwtService.sign({
      id: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    });

    const {
      password,
      adminCode,
      ...userWithoutPassword
    } = savedUser as any;

    return {
      message: 'Signup successful',
      access_token: token,
      role: savedUser.role,
      user: userWithoutPassword,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user =
      await this.authRepository.findOne({
        where: {
          email: loginAuthDto.email,
        },
      });

    if (!user) {
      return {
        message: 'Invalid email',
      };
    }

    const isPasswordValid =
      await bcrypt.compare(
        loginAuthDto.password,
        user.password,
      );

    if (!isPasswordValid) {
      return {
        message: 'Invalid password',
      };
    }

    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const {
      password,
      ...userWithoutPassword
    } = user;

    return {
      message: 'Login successful',
      access_token: token,
      role: user.role,
      user: userWithoutPassword,
    };
  }

  findAll() {
    return this.authRepository.find();
  }

  findOne(id: number) {
    return this.authRepository.findOneBy({
      id,
    });
  }

  async update(
    id: number,
    updateAuthDto: UpdateAuthDto,
  ) {
    await this.authRepository.update(
      id,
      updateAuthDto,
    );

    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (user) {
      await this.authRepository.remove(user);
    }

    return {
      message: 'User deleted successfully',
    };
  }
}