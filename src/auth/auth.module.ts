import { Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SharedModule } from 'src/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'database/constants/jwt.constants';
import { AuthGuard } from './guards/guards.guard';

@Module({
  imports: [
    SharedModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
})
export class AuthModule {}
