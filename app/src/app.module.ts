import { Module } from '@nestjs/common';
import { ServerConfig } from './shared/configs/server.config';
import { AppController } from './app.controller';
import { BoardModule } from './board/board.module';
import { CommentModule } from './comment/comment.module';
import { KeywordModule } from './keyword/keyword.module';
import { BoardController } from './board/board.controller';
import { CommentController } from './comment/comment.controller';
import { BoardService } from './board/board.service';
import { CommentService } from './comment/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { KeywordEventListener } from './shared/listeners/keyword-event.listener';
import { typeOrmModuleOptions } from './shared/database/typeorm-module.options';
import { eventEmitterModuleOptions } from './shared/configs/event-emitter.config';

@Module({
  imports: [
    ServerConfig,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    EventEmitterModule.forRoot(eventEmitterModuleOptions),
    BoardModule,
    CommentModule,
    KeywordModule,
  ],
  controllers: [AppController, BoardController, CommentController],
  providers: [BoardService, CommentService, KeywordEventListener],
})
export class AppModule {}
