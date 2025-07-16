import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { extname } from "path";
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

    async uploadFile(file: Express.Multer.File): Promise<String> {
        const fileExtension = extname(file.originalname);
        const key = `${uuidv4()}${fileExtension}`;
        const bucketName = process.env.AWS_BUCKET_NAME;
        
        await this.s3.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        }));

        return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }

    async deleteFile(fileUrl: string, bucketName: string): Promise<void> {
        const key = fileUrl.split('/').pop();

        await this.s3.send(new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        }));
    }
}


