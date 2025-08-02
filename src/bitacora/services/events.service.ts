import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsEntity } from '../entities/event.entity';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { MemberService } from '../../users/services/member.service';
import { ErrorManager } from '../../utils/error.manager';
import { EventsDTO, EventsUpdateDTO2 } from '../dto/events.dto';
import { MemberEntity } from '../../users/entities/member.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventsEntity) 
        private readonly eventsRepository:Repository<EventsEntity>,
        private readonly memberService:MemberService
    ){}
    
    public async createEvents(body:EventsDTO):Promise<EventsEntity>{
        try{
            const memberData = await this.memberService.findMemberById(body.member) 
                     
            if(memberData===undefined) {
                 throw new ErrorManager({type:'NOT_FOUND', message:'No se encontro miembro'})
            }
            body.member =  memberData.id;
            return await this.eventsRepository.save(body as DeepPartial<MemberEntity>)
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async allEvents():Promise<EventsEntity[]>{
        const events = await this.eventsRepository.find()
        if (events.length===0){
            throw new ErrorManager({
                type:'NOT_FOUND',
                message:"No hay eventos registrados"
            })
        }
        return events
    }

    public async findEventsByMembersId(memberId: string): Promise<EventsEntity[]> {
        try{
            const events: EventsEntity[] = await this.eventsRepository.find({
            where: { member: { id: memberId } },
            //relations: ['member'] // opcional, si quieres incluir datos del usuario
            });
            if(events.length===0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No tiene miembros el usuario'
                })
            }
            return events;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findEventById(id:string): Promise<EventsEntity>{
        try{
            const events = await this.eventsRepository.createQueryBuilder('event').where({id}).getOne();
            if(!events){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No existe ' + id + ' en la BD'
                })
            }
            return events;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    public async updateEvents(body:EventsUpdateDTO2,id:string): Promise<EventsEntity | undefined>{
        try{
            const events = await this.eventsRepository.findOne({where:{id}}); 
             if (!events){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:`No se ha podido actualizar el evento con id ${id}`
                })
            }
            const updatedEvents = Object.assign(events, body);
            return await this.eventsRepository.save(updatedEvents);       
                     
        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
    public async deletedEvents(id:string): Promise<DeleteResult>{
        try{
            const events:DeleteResult = await this.eventsRepository.delete(id); 
            if(events.affected ===0) {
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:`no se puede borrar ${id} en el sistema`  
                })
            }
            return events;
        }catch(error){
             throw ErrorManager.createSignatureError(`no existe ${id} en el sistema`)
        }
    }
}
