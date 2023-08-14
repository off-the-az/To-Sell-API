import { Shop } from "src/shops/entities/shop.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 125 })
    name: string;
    @Column({ length: 2000 })
    description: string;
    @Column()
    priceOld: number;
    @Column()
    priceNew: number;
    @ManyToOne(() => Shop, (shop) => shop.id)
    @JoinColumn({ name: 'shopId'})
    shopid: number;
    @Column()
    photoAmount: number;
}
