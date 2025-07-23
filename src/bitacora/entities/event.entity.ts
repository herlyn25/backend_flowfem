import { BaseEntity } from "../../config/base.entity";
import { CATEGORY, STATUSEVENTS } from "../../constants/status_events";
import { MemberEntity } from "../../users/entities/member.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({name:'events'})
export class EventsEntity extends BaseEntity{
    
    @Column()
    description:string;
    
    @Column()
    hora: string;
    
    @Column()
    min: string;

    @Column({type:'date', nullable:true})
    fecha: string;
    
    @Column({type:'enum', enum:CATEGORY})
    category: CATEGORY;

    @Column({type:'enum', enum:STATUSEVENTS})
    status: STATUSEVENTS
    
    @ManyToOne(()=>MemberEntity, (member)=>member.events)
    @JoinColumn({name:'member_id'})
    member: MemberEntity
}