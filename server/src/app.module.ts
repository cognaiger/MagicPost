import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PointModule } from './point/point.module';
import { BillModule } from './bill/bill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot("mongodb+srv://cognaiger:cognaig@cluster0.qkltkuw.mongodb.net/?retryWrites=true&w=majority"),
    AuthModule,
    PointModule,
    BillModule
  ]
})
export class AppModule {}
