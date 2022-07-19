import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { User } from "./users/user.entity"
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mongodb",
      "database": process.env.DATABASE_NAME,
      "url": `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@e2chat.va4mk.mongodb.net/?retryWrites=true&w=majority`,
      "useNewUrlParser": true,
      "synchronize": true,
      "logging": true,
      "useUnifiedTopology": true,
      "entities": [User]
    })],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
