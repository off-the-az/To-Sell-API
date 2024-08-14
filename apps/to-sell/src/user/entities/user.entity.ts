import { Role } from '../../users-role/constants/users-role.enum';
import { UsersRole } from '../../users-role/entities/users-role.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  name: string;
  @Column({ unique: true, length: 150 })
  mail: string;
  @Column({ length: 250 })
  password: string;
  @Column({ nullable: true, length: 250 })
  token: string;
  @ManyToOne(() => UsersRole, (role) => role.id, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'userRole' })
  userRole: Role[];
  @RelationId((user: User) => user.userRole)
  roleId: number;
  @Column({ nullable: true, length: 50 })
  tgChatId: string;
  @Column({ nullable: true, length: 250 })
  avatar: string;
  @Column({ type: 'boolean', default: false })
  isVerified: boolean;
}
