import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [SharedModule, TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
