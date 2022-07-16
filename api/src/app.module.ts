import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';


@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mongodb",
      "database": "twitter-clone",
      "url": `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@e2chat.va4mk.mongodb.net/?retryWrites=true&w=majority`,
      "useNewUrlParser": true,
      "synchronize": true,
      "logging": true,
      "entities": [__dirname + '/../**/*.entity.js']
    })],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
