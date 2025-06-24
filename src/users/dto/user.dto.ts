import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDTO{
    @IsNotEmpty()
    @IsString()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()    
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsString()
    role: string;
}