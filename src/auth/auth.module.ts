import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthControllers } from './controllers/auth.controllers';
import { UsersService } from 'src/users/services/users.service';
import { UsersController } from 'src/users/controllers/users.controllers';
import { UsersModule } from 'src/users/users.module';
import { AwsModule } from 'src/s3/aws.module';

@Global()
@Module({
  imports: [UsersModule, AwsModule],
  providers: [AuthService, UsersService],
  controllers: [AuthControllers, UsersController]
})
export class AuthModule {}
