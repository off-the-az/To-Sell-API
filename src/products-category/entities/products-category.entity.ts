import { Category } from "src/category/entities/category.entity";
import { Product } from "src/products/entities/product.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'productsCategory'})
export class ProductsCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=> Product, (product) => product.id)
    @JoinColumn({ name: 'productId'})
    productId: number;
    @ManyToOne(() => Category, (category) => category.id)
    @JoinColumn({ name: 'categoryId' })
    categoryId: number;
}
