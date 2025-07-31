import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class S3DTO{
    @ApiProperty({name: 'photo', type: String, required: false})
    @IsString()
    @IsOptional()
    photo: string;
}

export class S3UpdateDTO extends S3DTO {   
     @ApiProperty({name: 'newPhoto', required: true})
    newPhoto: string;
}