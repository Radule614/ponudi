import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose'


@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(`mongodb+srv://srdjan:srkisrki11@e2chat.va4mk.mongodb.net/olx-clone?retryWrites=true&w=majority`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
