import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
