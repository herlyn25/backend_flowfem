import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { UserDTO } from "../dto/user.dto";
import { UserUpdateDTO } from "../dto/user.update.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags('Users')
@Controller('users')
export class UsersController{
    constructor(private readonly userService:UsersService){}

    @Post('register')
    @UseInterceptors(FileInterceptor('role'))
    public async registerUser(@Body() body: UserDTO, @UploadedFile() file?: Express.Multer.File){
        return await this.userService.createUser(body, file);
    }
    @Get('all')
    public async findAllusers(){
        return await this.userService.findUsers()
    }
    @ApiParam({name:'id'}) 
    @Get(':id')
    public async findUserById(@Param('id') id:string){
        return await this.userService.findUserById(id)
    }

    @ApiParam({name:'id'}) 
    @Put('edit/:id')
    public async updateuser(@Param('id') id:string, @Body() body:UserUpdateDTO){
        return await this.userService.updateUser(body,id)
    }

    @ApiParam({name:'id'}) 
    @Delete('delete/:id')
    public async deleteuser(@Param('id') id:string){
        return await this.userService.deletedUser(id)
    }
}