import { Module } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './entities/member.entity';
import { Awss3Module } from 'src/awss3/awss3.module';
import { MemberService } from './services/member.service';
import { MemberControllers } from './controllers/member.controllers';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, MemberEntity]), 
      Awss3Module
    ],
    providers: [UsersService,MemberService],
    controllers: [UsersController, MemberControllers],
    exports: [UsersService, TypeOrmModule, MemberService]
})
export class UsersModule {}
