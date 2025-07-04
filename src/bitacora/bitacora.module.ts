import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsEntity } from './entities/event.entity';
import { MemberEntity } from 'src/users/entities/member.entity';
import { MemberService } from 'src/users/services/member.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventsEntity, MemberEntity])],
  providers: [EventsService, MemberService],
  controllers: [EventsController]
})
export class BitacoraModule {}
