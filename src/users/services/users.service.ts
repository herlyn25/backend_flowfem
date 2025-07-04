import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "../entities/users.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { UserDTO } from "../dto/user.dto";
import { UserUpdateDTO } from "../dto/user.update.dto";
import { ErrorManager } from "src/utils/error.manager";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService{
constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository:Repository<UsersEntity>
){}

public async createUser(body:UserDTO): Promise<UsersEntity>{
    try{
        body.password= await bcrypt.hash(body.password, +process.env.HASH_SALT)
        return await this.userRepository.save(body);
    }catch(error){
        throw new Error(error);
    }
}
public async findUsers(): Promise<UsersEntity[]>{
    try{
        const users:UsersEntity[] = await this.userRepository.find();
        if(users.length===0){
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'no se encontro resultados'
            })
        }
        return users;
    }catch(error){
        throw ErrorManager.createSignatureError(error.message);
    }
}
public async findUserById(id:string): Promise<UsersEntity>{
    try{
        const user = await this.userRepository.createQueryBuilder('user').where({id}).getOne();
        if(!user){
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'No existe ' + id + ' en la BD'
            })
        }
        return user;
    }catch(error){
        throw ErrorManager.createSignatureError(error.message);
    }
}

public async findBy({key, value}:{key:keyof UserDTO;value:any}){
  try {
    const user:UsersEntity = await this.userRepository
    .createQueryBuilder('userLogin')
    .addSelect('userLogin.password')
    .where({[key]:value})
    .getOne()
    return user
  } catch(error){
    throw ErrorManager.createSignatureError(error.message)
  } 
}
public async updateUser(body:UserUpdateDTO, id:string): Promise<UpdateResult | undefined>{
    try{
        const user:UpdateResult = await this.userRepository.update(id,body); 
        if(user.affected ===0) {
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:`no existe el elemento ${id} en el sistema` 
            })
        }
        return user;
    }catch(error){
        throw ErrorManager.createSignatureError(error.message);
    }
}
public async deletedUser(id:string): Promise<DeleteResult>{
    try{
        const member:DeleteResult = await this.userRepository.delete(id); 
        if(member.affected ===0) {
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:`no se puede borrar ${id} en el sistema`  
            })
        }
        return member;
    }catch(error){
         throw ErrorManager.createSignatureError(`no existe ${id} en el sistema`)
    }
}
}