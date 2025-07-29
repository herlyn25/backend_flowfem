import { BadRequestException, Body, Controller, Delete, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from '../service/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3DTO, S3UpdateDTO } from '../dto/s3.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('S3')
@Controller('s3')
export class S3Controller {
    constructor(private readonly s3Service: S3Service) {}

    @ApiParam({ name: 'photo', required: true })
    @Post('upload')
    @UseInterceptors(FileInterceptor('photo'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            return { photo: '' };
        }
        try {
            const fileUrl: string = await this.s3Service.uploadFile(file) as string;       
            return {
                photo: fileUrl
                };
            } catch (error) {                         
                throw new BadRequestException(`Error uploading file: ${error.message}`);
            }        
    }

    @ApiParam({ name: 'photo', required: true })
    @Delete('delete')
    async deleteFile(@Body() body: S3DTO): Promise<string> {
        const {photo} = body;
        
        if (!photo) {
            throw new BadRequestException('Photo URL is required');
        }
        try {
            await this.s3Service.deleteFile(photo);
            return "File deleted successfully";
        } catch (error) {
            throw new BadRequestException(`Error deleting file: ${error.message}`);
        }
    }

    @ApiParam({ name: 'user', required: true })
    @ApiParam({ name: 'file', required: true })
    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updateFile(@Body() body: S3UpdateDTO, @UploadedFile() file: Express.Multer.File): Promise<string> {
        const { photo } = body;      
        
        if (!file) {
            throw new BadRequestException('newPhoto URL is required');
        }
        try {
            const newFileUrl = await this.s3Service.updateFile(photo, file) as string;
            return newFileUrl;
        } catch (error) {
            throw new BadRequestException(`Error updating file: ${error.message}`);
        }
    }
}