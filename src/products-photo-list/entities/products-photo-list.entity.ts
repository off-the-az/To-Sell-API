import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'productsPhotoList' })
export class ProductsPhotoList {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Product, (product)=> product.id)
    @JoinColumn({ name: 'productId' })
    productId: number;
    @Column()
    photo: string;
}
