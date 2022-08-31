import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./envs/.${environment}.env`,
    }),
  ],
})
export class ServerConfig {}
