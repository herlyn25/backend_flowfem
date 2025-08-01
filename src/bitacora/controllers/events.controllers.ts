import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { EventsDTO, EventsUpdateDTO2 } from '../dto/events.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
    constructor(private readonly eventsService:EventsService){}

    @Post('register')
    public async createEvent(@Body() body:EventsDTO, @Param('id_member') id_member:string){
        const events = await this.eventsService.createEvents(body)
        return events
    }
    
    @Get('all')
    public async allEvents(){
        return await this.eventsService.allEvents()
    }

    @Get('member/:id')
    public async EventsByIdMember(@Param('id') id:string){
        return await this.eventsService.findEventsByMembersId(id)
    }

    @Get(':id')
    public async EventsById(@Param('id') id:string){
        return await this.eventsService.findEventById(id)
    }

    @Put('update/:id')    
    public async UpdateEvents(@Param('id') id:string, @Body() body:EventsUpdateDTO2){
        return await this.eventsService.updateEvents(body, id)
    }

    @Delete('delete/:id')
    public async DeleteEvents(@Param('id') id:string){
        return await this.eventsService.deletedEvents(id)
    }
}