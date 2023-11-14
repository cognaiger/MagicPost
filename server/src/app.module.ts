import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PointModule } from './point/point.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot("mongodb+srv://cognaiger:cognaig@cluster0.qkltkuw.mongodb.net/?retryWrites=true&w=majority"),
    AuthModule,
    PointModule
  ]
})
export class AppModule {}
