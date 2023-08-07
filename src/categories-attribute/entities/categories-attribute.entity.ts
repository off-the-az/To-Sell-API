import { Attribute } from "src/attribute/entities/attribute.entity";
import { Category } from "src/category/entities/category.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categoriesAttribute' })
export class CategoriesAttribute {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>Category, (category)=>category.id)
    @JoinColumn({ name: 'categoryId' })
    categoryId: number;
    @ManyToOne(()=>Attribute, (attribute)=>attribute.id)
    @JoinColumn({ name: 'attributeId' })
    attributeId: number;
}
