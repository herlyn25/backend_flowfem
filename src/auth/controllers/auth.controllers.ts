import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from '../interfaces/auth.interfaces';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthControllers {
    constructor (private readonly authService:AuthService){}
    
    @Post('login')
    async login(@Body() {username,password}: AuthDTO){
        const uservalidate = await this.authService.validateUser(username,password);
        if(!uservalidate) throw new UnauthorizedException("data no valid");
        return await this.authService.generateJWT(uservalidate);
    }
}
