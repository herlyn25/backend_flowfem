import { IsEnum, IsEmpty, IsOptional, IsString, IsDateString } from "class-validator";
import { CATEGORY, STATUSEVENTS } from "../../constants/status_events";

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
    @IsDateString()
    fecha: string; 
    
    @IsEmpty()
    @IsEnum(CATEGORY)
    category: CATEGORY;
    
    @IsEmpty()
    @IsEnum(STATUSEVENTS)
    status: STATUSEVENTS

    @IsEmpty()
    @IsString()
    member: string
}