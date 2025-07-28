import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
        private s3 = new S3Client({                   
                region: process.env.AWS_REGION,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            }); 
        private readonly bucketName: string = process.env.AWS_BUCKET_NAME;
    
        async uploadFile(file: Express.Multer.File): Promise<String> {
            const fileExtension = extname(file.originalname);
            const key = `${uuidv4()}${fileExtension}`;            
            
            await this.s3.send(new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            }));
    
            return `https://${this.bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
        }
    
        async deleteFile(fileUrl: string): Promise<void> {
            const key = fileUrl.split('/').pop();
    
            await this.s3.send(new DeleteObjectCommand({
                Bucket: this.bucketName,
                Key: key,
            }));
        }
        async updateFile( oldKey: string, newFile: Express.Multer.File): Promise<string> {
            // 1. Eliminar archivo anterior
            await this.deleteFile(oldKey);
            // 2. Subir nuevo archivo
            const newKey = await this.uploadFile(newFile) as string;

        return newKey;
  }
    }
