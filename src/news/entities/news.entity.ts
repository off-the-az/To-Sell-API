import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 150 })
  title: string;
  @Column({ length: 2000 })
  description: string;
  @Column({ length: 250 })
  photo: string;
  @Column()
  date: Date;
}
