import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './entities/event.entity';
import { MemberEntity } from 'src/users/entities/member.entity';
import { MemberService } from 'src/users/services/member.service';
import { Awss3Module } from 'src/awss3/awss3.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventsEntity, MemberEntity]), 
    UsersModule, Awss3Module
  ],
  providers: [EventsService],
  controllers: [EventsController]
})
export class BitacoraModule {}
