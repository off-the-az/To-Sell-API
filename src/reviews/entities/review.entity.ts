import { Product } from "src/products/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reviews' })
export class Review {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: 'productId' })
    productId: number;
    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;
    @Column({ type: 'tinyint' })
    stars: number;
    @Column({ length: 500 })
    comment: string;
    @Column({
        type: 'datetime',
        default: () => 'NOW()',
      })
    date: string;
}
