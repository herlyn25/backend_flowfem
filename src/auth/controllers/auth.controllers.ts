import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthControllers {
    constructor (private readonly authService:AuthService){}
    
    @Post('login')
    async login(@Body() {username,password}: AuthDTO){
        const uservalidate = await this.authService.validateUser(username,password);
        const token = await this.authService.generateJWT(uservalidate);
        if(uservalidate===null) throw new UnauthorizedException("data not valid");
        return {
            "token": token.accessToken,
            "user": uservalidate
        };
    }
}
