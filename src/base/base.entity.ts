import { Exclude } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, Column } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  @Exclude()
  deleteAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @Column('varchar', { length: 40, default: 'db' })
  createBy: string;
  @Column('varchar', { length: 40, default: 'db' })
  @Exclude()
  deleteBy: string;
  @Column('varchar', { length: 40, default: 'db' })
  updateBy: string;
}
