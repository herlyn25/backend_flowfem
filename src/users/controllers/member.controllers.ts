import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MemberService } from "../services/member.service";
import { MemberDTO, UpdateMemberDTO } from "../dto/member.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('Members')
@Controller("members")
export class MemberControllers{
    constructor(private readonly memberService:MemberService){}

    @UseInterceptors(FileInterceptor('file'))
    @Post('register')
    public async registerMemberTCo(@Body() body:MemberDTO, @UploadedFile() file:Express.Multer.File){        
        return await this.memberService.createMember(body, file)
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('edit/:id/photo')
    public async updatePhoto(@Param() id:string, @UploadedFile() file:Express.Multer.File){        
        return await this.memberService.updatePhoto(id, file)
    }

    @ApiParam({name:'id'}) 
    @Get('all')
    public async membersAll(){
       return await this.memberService.findMembers();
    }

    @ApiParam({name:'id'}) 
    @Get(':id')
    public async membersById(@Param('id') id:string){
       return await this.memberService.findMemberById(id);
    }

    @ApiParam({name:'id_user'}) 
    @Get('user/:id_user')
    public async memberByIdUser(@Param('id_user') id:string){
        return await this.memberService.findMembersByUserId(id)
    }

    @ApiParam({name:'id'}) 
    @Put('update/:id')
    public async updateMember(@Param('id') id:string, @Body() body:UpdateMemberDTO){
        return await this.memberService.updateMembers(id,body)
    }
    
    @ApiParam({name:'id'}) 
    @Delete('delete/:id')
    public async deleteMember(@Param('id') id:string){
        return await this.memberService.deleteMembers(id)
    } 


}