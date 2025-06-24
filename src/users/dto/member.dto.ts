import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class MemberDTO{
    
    @IsNotEmpty()
    @IsString()
    firstname:string;
   
    @IsNotEmpty()
    @IsString()
    lastname:string;
    
    @IsNotEmpty()
    @IsString()
    photo:string;

    @IsNotEmpty()
    @IsUUID()
    user:string
}

export class UpdateMemberDTO extends PartialType(MemberDTO){}