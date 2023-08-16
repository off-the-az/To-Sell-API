import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'ordersStatus'
})
export class OrderStatus {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    statusName: string;
}
