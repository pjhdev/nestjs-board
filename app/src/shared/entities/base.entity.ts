import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export abstract class BaseEntity<T> {
  @ApiProperty()
  @Type(() => Number)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty()
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  constructor(partial: Partial<T>) {
    Object.assign(this, partial);
  }
}
