import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usersRole' })
export class UsersRole {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 150 })
  name: string;
}
