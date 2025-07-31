import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, DeleteResult, Repository } from "typeorm";
import { MemberEntity } from "../entities/member.entity";
import { MemberDTO, UpdateMemberDTO } from "../dto/member.dto";
import { ErrorManager } from "src/utils/error.manager";
import { S3Service } from "src/awss3/service/s3.service";

@Injectable()
export class MemberService{
    constructor(
        @InjectRepository(MemberEntity)
        private readonly memberRepository:Repository<MemberEntity>,
        private readonly s3Service: S3Service
    ){}

    public async createMember(body:MemberDTO, file:Express.Multer.File): Promise<MemberEntity>{
        try{            
            if (!file) {
                body.photo=''
            }                       
            body.photo = file ? await this.s3Service.uploadFile(file) as string: '';             
            const savedMember = await this.memberRepository.save(body as DeepPartial<MemberEntity>);       
            return savedMember;
        }catch(error){
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
                    message:'No tiene miembros el user'
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

    public async deletePhoto(id:string):Promise<string>{
        const memberPhoto = await this.findMemberById(id)
        await this.s3Service.deleteFile(memberPhoto.photo)
        return "Photo eliminada con exito"
    }

    public async updatePhoto(id:string, file:Express.Multer.File):Promise<MemberEntity>{
        await this.deletePhoto(id);
        const member = await this.findMemberById(id)
        member.photo = await this.s3Service.uploadFile(file)
        return await this.memberRepository.save(member)
    }

     public async deleteMembers(id:string){
        try{
            await this.deletePhoto(id);
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