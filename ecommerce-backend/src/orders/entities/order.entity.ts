import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customerEmail!: string;

  @Column()
  productName!: string;

  @Column()
  price!: number;

  @Column({
    default: 'pending',
  })
  status!: string;
}