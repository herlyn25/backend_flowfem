import { Module } from '@nestjs/common';
import { UsersEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity } from './entities/member.entity';
import { MemberService } from './services/member.service';
import { MembersControllers } from './controllers/member.controllers';
import { S3Service } from 'src/awss3/service/s3.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity, MemberEntity])
    ],
    providers: [UsersService,MemberService, S3Service],
    controllers: [UsersController, MembersControllers],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
