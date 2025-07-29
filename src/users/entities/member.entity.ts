import { BaseEntity } from "../../config/base.entity"
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { UsersEntity } from "./users.entity";
import { EventsEntity } from "../../bitacora/entities/event.entity";

@Entity('members')
export class MemberEntity extends BaseEntity{

@Column()
firstname:string;

@Column()
lastname:string;

@Column({nullable:true})
gender: string;

@Column()
photo:string;

@ManyToOne(()=>UsersEntity,(user)=>user.members)
user:UsersEntity

@OneToMany(()=>EventsEntity,(events)=>events.member)
events:EventsEntity[]
}