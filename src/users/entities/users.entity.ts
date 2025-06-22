import { BaseEntity } from "../../config/base.entity";
import { IUser } from "../../interfaces/user.interface";
import { Column, Entity } from "typeorm";

@Entity({name:'users'})
export class Users extends BaseEntity implements IUser{
    @Column({nullable:false})
    firstName: string;

    @Column({nullable:false})
    lastName: string;

    @Column({nullable:false})
    age: number;

    @Column({nullable:false , unique:true})
    email: string;
    
    @Column({nullable:false , unique:true})
    username: string;

    @Column({nullable:false})
    password: string;
    
    @Column({nullable:false})
    role: string;
}