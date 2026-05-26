import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column({
  default: 0,
  })
  stock!: number;

  @Column({
    default: true,
  })
  isAvailable!: boolean;
}
