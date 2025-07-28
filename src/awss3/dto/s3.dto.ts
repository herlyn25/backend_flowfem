import { IsOptional, IsString } from "class-validator";

export class S3DTO{
    @IsString()
    @IsOptional()
    photo: string;
}

export class S3UpdateDTO extends S3DTO {   
    newPhoto: string;
}