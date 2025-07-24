import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const CORS:CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials:true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    exposedHeaders: 'Access-Control-Allow-Private-Network, Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}