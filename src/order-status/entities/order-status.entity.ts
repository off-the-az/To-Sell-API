import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'orderStatus'
})
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    statusName: string;
}
