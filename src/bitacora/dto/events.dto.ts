import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CATEGORY, STATUSEVENTS } from "../../constants/status_events";
import { MemberDTO } from "../../users/dto/member.dto";

export class EventsDTO {    
    @IsNotEmpty()
    @IsString()
    description:string;  
    
    @IsNotEmpty()
    @IsString()
    hora: string;   
    
    @IsNotEmpty()
    @IsString()
    min: string;    
    
    @IsNotEmpty()
    @IsEnum(CATEGORY)
    category: CATEGORY;
    
    @IsNotEmpty()
    @IsEnum(STATUSEVENTS)
    status: STATUSEVENTS

    @IsOptional()
    member: MemberDTO
}