import { IsEnum, IsEmpty, IsOptional, IsString } from "class-validator";
import { CATEGORY, STATUSEVENTS } from "../../constants/status_events";
import { MemberDTO } from "../../users/dto/member.dto";

export class EventsUpdateDTO {    
    @IsEmpty()
    @IsString()
    description:string;  
    
    @IsEmpty()
    @IsString()
    hora: string;   
    
    @IsEmpty()
    @IsString()
    min: string;    
    
    @IsEmpty()
    @IsEnum(CATEGORY)
    category: CATEGORY;
    
    @IsEmpty()
    @IsEnum(STATUSEVENTS)
    status: STATUSEVENTS

    @IsOptional()
    member: MemberDTO
}