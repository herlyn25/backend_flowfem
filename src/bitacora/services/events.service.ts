import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsEntity } from '../entities/event.entity';
import { DeleteResult, Repository } from 'typeorm';
import { MemberService } from '../../users/services/member.service';
import { EventsDTO } from '../dto/events.dto';
import { ErrorManager } from '../../utils/error.manager';
import { EventsUpdateDTO } from '../dto/events.update.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventsEntity) 
        private readonly eventsRepository:Repository<EventsEntity>,
        private readonly memberService:MemberService
    ){}
    
    public async createEvents(body:EventsDTO, idMember:string):Promise<EventsEntity>{
        try{
            const member = await this.memberService.findMemberById(idMember)
            console.log(member.user)
            if(member===undefined) {
                 throw new ErrorManager({type:'NOT_FOUND', message:'No se encontro miembro'})
            }
            return await this.eventsRepository.save({...body, member})
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
            //relations: ['user'] // opcional, si quieres incluir datos del usuario
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
    public async updateEvents(id:string, body:EventsUpdateDTO): Promise<EventsEntity | undefined>{
        try{
            const events =await this.eventsRepository.findOne({where:{id}}); 
             if (!events){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se ha podido actualizar ningun registro'
                })
            }
            const update_events = Object.assign(events,body)
            return await this.eventsRepository.save(update_events)           
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
