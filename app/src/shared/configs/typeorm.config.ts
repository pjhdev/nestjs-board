import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Board } from '../../board/entities/board.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';
import { CustomNamingStrategy } from '../database/custom-naming-strategy';

const environment = process.env.NODE_ENV || 'development';

console.log(__dirname);
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER_NAME'),
  password: configService.get('DB_USER_PW'),
  database: configService.get('DB_NAME'),
  namingStrategy: new CustomNamingStrategy(),
  charset: 'utf8mb4',
  entities: [Board, Comment, Keyword],
  migrations: ['dist/migrations/*{.ts,.js}'],
});
