import { Module } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './entities/member.entity';
import { MemberService } from './services/member.service';
import { MembersControllers } from './controllers/member.controllers';


@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, MemberEntity])
    ],
    providers: [UsersService,MemberService],
    controllers: [UsersController, MembersControllers],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
