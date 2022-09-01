import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../../shared/entities/base.entity';
import { Comment } from '../../comment/entities/comment.entity';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CustomException } from "../../shared/exceptions/custom.exception";
import { InternalErrorCode } from "../../shared/exceptions/internal-error-code.enum";

@Entity()
export class Board extends BaseEntity<Board> {
  @ApiProperty()
  @Index('idx_fulltext_title', { fulltext: true })
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  @ApiProperty()
  @Column({ type: 'text', nullable: false })
  content: string;

  @ApiProperty()
  @Index('idx_fulltext_author', { fulltext: true })
  @Column({ type: 'varchar', length: 30, nullable: false })
  author: string;

  @Exclude()
  @ApiProperty()
  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @OneToMany(() => Comment, (comment) => comment.board, {
    cascade: true,
  })
  comments: Promise<Comment[]>;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async validatePassword(saltedPassword: string): Promise<void> {
    if (!(await bcrypt.compare(saltedPassword, this.password))) {
      throw new CustomException({
        errorCode: InternalErrorCode.BOARD_PASSWORD_MISMATCH,
        errorMessage: 'BOARD_PASSWORD_MISMATCH',
      });
    }
  }
}
