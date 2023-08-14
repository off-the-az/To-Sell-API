import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'cart'
})
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: 'productId' })
    productId: number;
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;
    @Column({ type: 'int' })
    amount: number;
}
