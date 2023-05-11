import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto, registerDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject('KnexConnection') private knex: Knex,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: registerDto): Promise<Record<string, string>> {
    const { name, username, password } = createAuthDto;

    const hash = await bcrypt.hash(password, 10);

    const user = await this.knex
      .select('*')
      .from('users')
      .where({ user_username: username })
      .first();

    if (user) {
      throw new BadRequestException('Invalid username or password');
    }

    const userId = user;
    const payload = { userId, username };

    const token = await this.jwtService.sign(payload);

    await this.knex('users').insert({
      user_name: name,
      user_username: username,
      user_password: hash,
    });

    return { message: 'Succsessfuly Register', token: token };
  }

  async login(createAuthDto: loginDto): Promise<Record<string, string>> {
    const { username, password } = createAuthDto;

    const user = await this.knex
      .select('*')
      .from('users')
      .where({ user_username: username })
      .first();

    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    const hash = await bcrypt.compare(password, user.user_password);

    if (!hash) {
      throw new BadRequestException('Invalid password or username');
    }

    const userId = user.user_id;
    const userusername = user.user_username;

    const payload = { userId, userusername };
    const token = await this.jwtService.sign(payload);

    return { message: 'Succsessfuly Login', token: token };
  }
}
