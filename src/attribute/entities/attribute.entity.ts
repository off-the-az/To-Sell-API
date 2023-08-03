import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'attribute' })
export class Attribute {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({  length: 50 })
    name: string;
}
