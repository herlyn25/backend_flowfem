import {IsNumber, IsOptional, IsString } from "class-validator";

export class UserUpdateDTO{
    @IsOptional()
    @IsString()
    firstName: string;
    
    @IsOptional()
    @IsString()    
    lastName: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    email: string;
    
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;
    
    @IsOptional()
    @IsString()
    role: string;

    @IsOptional() 
    @IsString()
    photo: string;

    @IsString()
    @IsOptional()
    gender: string;
}