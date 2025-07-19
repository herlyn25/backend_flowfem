import { BaseEntity } from "../../config/base.entity";
import { IUser } from "../../interfaces/user.interface";
import { Column, Entity, OneToMany } from "typeorm";
import { MemberEntity } from "./member.entity";
import { Exclude } from "class-transformer";

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

    @Exclude()
    @Column()
    password: string;
    
    @Column()
    role: string;

    @Column({nullable:true})
    photo: string;

    @OneToMany(()=>MemberEntity, (member)=>member.user)
    members:MemberEntity[]
}