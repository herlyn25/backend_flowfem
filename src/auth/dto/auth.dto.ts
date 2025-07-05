import { IsNotEmpty } from "class-validator";
import { AuthBody } from "../interfaces/auth.interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO implements AuthBody {
    @ApiProperty()
    @IsNotEmpty()
    username: string;
    
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}