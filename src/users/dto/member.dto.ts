import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class MemberDTO{
    
    @ApiProperty()    
    @IsNotEmpty()
    @IsString()
    firstname:string;
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname:string;
    
    @ApiProperty()
    photo:string;

    @IsString()
    @ApiProperty()    
    gender: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    user:string
}

export class UpdateMemberDTO extends PartialType(MemberDTO){}