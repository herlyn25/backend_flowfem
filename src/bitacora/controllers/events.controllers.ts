import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { EventsDTO } from '../dto/events.dto';
import { EventsUpdateDTO } from '../dto/events.update.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService:EventsService){}

    @Post('register/:id_member')
    public async createEvent(@Body() body:EventsDTO, @Param('id_member') id_member:string){
        const events = await this.eventsService.createEvents(body,id_member)
        return events
    }
    
    @Get('all')
    public async allEvents(){
        return await this.eventsService.allEvents()
    }

    @Get('events/:id')
    public async EventsByIdMember(@Param('id') id:string){
        return await this.eventsService.findEventsByMembersId(id)
    }

    @Get(':id')
    public async EventsById(@Param('id') id:string){
        return await this.eventsService.findEventById(id)
    }

    @Put('update/:id')    
    public async UpdateEvents(@Param('id') id:string, @Body() body:EventsUpdateDTO){
        return await this.eventsService.updateEvents(id,body)
    }

    @Delete('delete/:id')
    public async DeleteEvents(@Param('id') id:string){
        return await this.eventsService.deletedEvents(id)
    }
}