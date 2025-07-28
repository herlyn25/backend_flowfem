import { Module, Global } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthControllers } from './controllers/auth.controllers';
import { UsersService } from 'src/users/services/users.service';
import { UsersController } from 'src/users/controllers/users.controllers';
import { UsersModule } from 'src/users/users.module';
import { S3Service } from 'src/awss3/service/s3.service';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService, S3Service],
  controllers: [AuthControllers, UsersController]
})
export class AuthModule {}
