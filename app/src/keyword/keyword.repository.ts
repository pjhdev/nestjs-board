import { DataSource, Repository } from 'typeorm';
import { Keyword } from './entities/keyword.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KeywordRepository extends Repository<Keyword> {
  constructor(datasource: DataSource) {
    super(Keyword, datasource.createEntityManager());
  }

  async findMatchingKeywords(keywords: string[]): Promise<Keyword[]> {
    return await this.createQueryBuilder()
      .where('keyword IN (:keywords)', { keywords })
      .getMany();
  }
}
