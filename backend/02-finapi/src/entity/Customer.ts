import {
  Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { FinancialMovement } from './FinancialMovement';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({
    length: 11,
    unique: true,
  })
  cpf!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => FinancialMovement, (financialMovement) => financialMovement.customer)
  financial_movements!: FinancialMovement[];
}
