import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot("mongodb+srv://cognaiger:cognaig@cluster0.qkltkuw.mongodb.net/?retryWrites=true&w=majority"),
    AuthModule
  ]
})
export class AppModule {}
