import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthControllers } from './controllers/auth.controllers';
import { UsersService } from 'src/users/services/users.service';
import { UsersController } from 'src/users/controllers/users.controllers';
import { UsersModule } from 'src/users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthControllers, UsersController]
})
export class AuthModule {}
