import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'ticket'
})
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;
    @Column()
    address: string;
    @Column()
    totalSum: number;
    @Column({
        type: 'datetime',
        default: () => 'NOW()',
      })
    date: string;
}
