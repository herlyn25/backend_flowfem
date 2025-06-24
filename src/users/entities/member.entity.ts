import { BaseEntity } from "../../config/base.entity"
import { Column, Entity, ManyToOne } from "typeorm";
import { UsersEntity } from "./users.entity";

@Entity('members')
export class MemberEntity extends BaseEntity{

@Column()
firstname:string;

@Column()
lastname:string;

@Column()
photo:string;

@ManyToOne(()=>UsersEntity,(user)=>user.members)
user:UsersEntity
}