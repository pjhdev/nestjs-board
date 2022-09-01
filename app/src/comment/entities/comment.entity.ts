import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { Board } from '../../board/entities/board.entity';
import { Type } from 'class-transformer';

@Entity()
export class Comment extends BaseEntity<Comment> {
  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  author: string;

  @Type(() => Number)
  @Column({ type: 'bigint', nullable: false })
  parent: number;

  @ManyToOne(() => Board, (board) => board.comments, {
    onDelete: 'CASCADE'
  })
  board: Promise<Board>;
}
