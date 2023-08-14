import { Product } from "src/products/entities/product.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(
    {
        name: 'ticketsProductList'
    }
)
export class TicketsProductList {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Ticket, (ticket) => ticket.id)
    @JoinColumn({
        name: 'ticketId'
    })
    ticketId: number;
    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({
        name: 'productId'
    })
    productId: number;
    @Column()
    amount: number;
}
