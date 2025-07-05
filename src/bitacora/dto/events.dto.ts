import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CATEGORY, STATUSEVENTS } from "../../constants/status_events";
import { MemberDTO } from "../../users/dto/member.dto";
import { ApiProperty } from "@nestjs/swagger";

export class EventsDTO {
   
    @ApiProperty()    
    @IsNotEmpty()
    @IsString()
    description:string;  
   
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    hora: string;   
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    min: string;    
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(CATEGORY)
    category: CATEGORY;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(STATUSEVENTS)
    status: STATUSEVENTS

    @ApiProperty()
    @IsOptional()
    member: MemberDTO
}