import 'dotenv/config'
import { ConfigModule} from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

ConfigModule.forRoot({
    envFilePath:'env'
})


export const dataSourceConfig: DataSourceOptions = {
    type:'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:[__dirname+'/../**/*.entity{.ts,.js}'],
    migrations:[__dirname+'/../migration/*{.ts,.js}'],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false
    },
    namingStrategy: new SnakeNamingStrategy(),
}
export const appDS = new DataSource(dataSourceConfig);