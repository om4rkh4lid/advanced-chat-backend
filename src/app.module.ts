import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
  PrismaModule.forRoot({
    isGlobal: true,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }), 
  ChatModule, 
  AuthModule, 
  UsersModule,
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
