import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/user.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { SendgridMailService } from './sendgrid.service';


const jwtFactory = {
  useFactory: async () => ({
    secret: process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
    signOptions: {
      expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES
    }
  })
}


@Module({
  controllers: [EmailController],
  providers:
    [
      {
        useClass: SendgridMailService,
        provide: 'IEmailProvider'
      },
      EmailService
    ],
  exports: [EmailService],
  imports: [
    JwtModule.registerAsync(jwtFactory),
    UsersModule
  ]
})
export class EmailModule { }
