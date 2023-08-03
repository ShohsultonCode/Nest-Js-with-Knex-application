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
  ) { }

  async register(createAuthDto: registerDto): Promise<Record<string, string>> {
    const { name, username, password } = createAuthDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.knex
      .select('*')
      .from('users')
      .where({ user_username: username.toLowerCase().trim() })
      .first();

    if (user) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = await this.knex('users')
      .insert({
        user_name: name.toLowerCase().trim(),
        user_username: username.toLowerCase().trim(),
        user_password: hashedPassword,
      })
      .returning('*');

    const userId = newUser[0].user_id;
    const payload = { userId };

    const token = this.jwtService.sign(payload);

    return { message: 'Successfully registered', token };
  }

  async login(createAuthDto: loginDto): Promise<Record<string, string>> {
    const { username, password } = createAuthDto;

    const user = await this.knex
      .select('*')
      .from('users')
      .where({ user_username: username.toLowerCase().trim() })
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
