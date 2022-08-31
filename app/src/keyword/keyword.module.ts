import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from './entities/keyword.entity';
import { KeywordRepository } from './keyword.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  providers: [KeywordRepository],
  exports: [KeywordRepository],
})
export class KeywordModule {}
