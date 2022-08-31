import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';

@Entity()
export class Keyword extends BaseEntity<Keyword> {
  @Column({ type: 'varchar', length: 30, nullable: false })
  author: string;

  @Index('idx_keyword')
  @Column({ type: 'varchar', length: 30, nullable: false })
  keyword: string;
}
