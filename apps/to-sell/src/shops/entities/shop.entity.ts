import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'ownerId' })
  ownerId: number;
}
