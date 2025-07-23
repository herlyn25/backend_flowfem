import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { MemberEntity } from "../entities/member.entity";
import { MemberDTO, UpdateMemberDTO } from "../dto/member.dto";
import { ErrorManager } from "src/utils/error.manager";

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(MemberEntity) 
        private readonly memberRepository:Repository<MemberEntity>
    ){}

    public async createMember(body:MemberDTO):Promise<MemberEntity>{
        try {
            return await this.memberRepository.save(body as DeepPartial<MemberEntity>);
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    public async findMembers():Promise<MemberEntity[]>{
        try{ 
            const members: MemberEntity[] = await this.memberRepository.find();
            if(members.length===0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No hay miembros registrados'
                })
            }
            return members;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findMembersByUserId(userId: string): Promise<MemberEntity[]> {
        try{
            const users: MemberEntity[] = await this.memberRepository.find({
            where: { user: { id: userId } },
            relations: ['user'] // opcional, si quieres incluir datos del usuario
            });
            if(users.length===0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No tiene miembros el usuario'
                })
            }
            return users;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    public async findMemberById(id:string): Promise<MemberEntity>{
        try{
            const member = await this.memberRepository.createQueryBuilder('member').where({id}).getOne();
            if(!member){
                throw new ErrorManager({
                    type:'FORBIDDEN',
                    message:'No existe ' + id + ' en la BD'
                })
            }
            return member;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message);
        }
    }
        
    public async updateMembers(id:string, body:UpdateMemberDTO):Promise<MemberEntity>{
        try{
            const member = await this.memberRepository.findOne({where:{id}});
            if (!member){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se ha podido actualizar ningun registro'
                })
            }
            const update_member = Object.assign(member,body)
            return await this.memberRepository.save(update_member)
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

     public async deleteMembers(id:string){
        try{
            const member:DeleteResult = await this.memberRepository.delete(id);
            if (member.affected ===0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se ha podido actualizar ningun registro'
                })
            }
            return member
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}