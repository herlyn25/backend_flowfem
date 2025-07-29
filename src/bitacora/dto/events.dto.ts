import { IsDateString, IsEmpty, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { CATEGORY, STATUSEVENTS } from "../../constants/status_events";
import { MemberDTO } from "../../users/dto/member.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class EventsDTO {
   
    @ApiProperty()    
    @IsNotEmpty()
    @IsString()
    description:string;  
    
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    fecha?: string; 
    
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
    @IsNotEmpty()
    @IsUUID()
    member: string
}

export class EventsUpdateDTO2 extends PartialType(EventsDTO) { 
}
