import { BaseEntity } from "../../config/base.entity";
import { IUser } from "../../interfaces/user.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { MemberEntity } from "./member.entity";

@Entity({name:'users'})
export class UsersEntity extends BaseEntity implements IUser{
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({unique:true})
    email: string;
    
    @Column({unique:true})
    username: string;

    @Column()
    password: string;
    
    @Column()
    role: string;

    @OneToMany(()=>MemberEntity, (member)=>member.user)
    members:MemberEntity[]
}