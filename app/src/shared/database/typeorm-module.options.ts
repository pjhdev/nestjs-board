import { DataSourceOptions } from 'typeorm';
import { CustomNamingStrategy } from './custom-naming-strategy';

export const typeOrmModuleOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PW,
  synchronize:
    (process.env.DB_SYNCHRONIZE && JSON.parse(process.env.DB_SYNCHRONIZE)) ||
    false,
  namingStrategy: new CustomNamingStrategy(),
  charset: 'utf8mb4',
  logging: process.env.ENVIRONMENT === 'development',
  database: process.env.DB_NAME,
  entities: ['dist/src/**/entities/*.entity{.d.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsRun: process.env.ENVIRONMENT === 'development',
};
