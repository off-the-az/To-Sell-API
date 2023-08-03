import { Attribute } from "src/attribute/entities/attribute.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'attributesValue' })
export class AttributesValue {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=> Attribute, (attr)=> attr.id)
    @JoinColumn({ name: 'attributeId' })
    attributeId: number;
    @Column({ length: 255 })
    value: string;
}
