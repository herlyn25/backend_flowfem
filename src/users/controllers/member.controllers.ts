import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { MemberDTO, UpdateMemberDTO } from "../dto/member.dto";
import { MemberService } from "../services/member.service";
import { ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('Members')
@Controller("members")
export class MembersControllers{
    constructor (private readonly memberService:MemberService){}
    
    @Post('register')
    public async registerMember(@Body() body:MemberDTO){
        const member = await this.memberService.createMember(body)     
        return member   
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
    @Get('members/:id_user')
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