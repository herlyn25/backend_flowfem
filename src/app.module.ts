import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfig } from './config/data-source';
import { AuthModule } from './auth/auth.module';
import { BitacoraModule } from './bitacora/bitacora.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath:".env",
    isGlobal:true
    }),
    TypeOrmModule.forRoot({...dataSourceConfig}),    
    UsersModule, AuthModule, BitacoraModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
