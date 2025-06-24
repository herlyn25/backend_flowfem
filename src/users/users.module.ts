import { Module } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity])
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
