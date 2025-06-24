import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserDTO } from "../dto/user.dto";
import { UserUpdateDTO } from "../dto/user.update.dto";

@Controller('users')
export class UsersController{
    constructor(private readonly userService:UsersService){}

    @Post('register')
    public async registerUser(@Body() body: UserDTO){
        return await this.userService.createUser(body)
    }
    @Get('all')
    public async findAllusers(){
        return await this.userService.findUsers()
    }
    @Get(':id')
    public async findUserById(@Param('id') id:string){
        return await this.userService.findUserById(id)
    }
    @Put('edit/:id')
    public async updateuser(@Param('id') id:string, @Body() body:UserUpdateDTO){
        return await this.userService.updateUser(body,id)
    }
    @Delete('delete/:id')
    public async deleteuser(@Param('id') id:string){
        return await this.userService.deletedUser(id)
    }
}