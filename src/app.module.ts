import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './config/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:".env",
    isGlobal:true
    }),
    TypeOrmModule.forRoot({...dataSourceConfig}),    
    UsersModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
