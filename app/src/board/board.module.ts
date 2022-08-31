import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardRepository } from './board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardRepository],
  exports: [BoardRepository],
})
export class BoardModule {}
