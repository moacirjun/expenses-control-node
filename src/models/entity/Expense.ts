import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Category } from "./Category";

@Entity('tb_expense')
export class Expense {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'character varying',
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        type: 'character varying',
        length: 255
    })
    description: string;

    @Column({
        type: "numeric",
        precision: 11,
        scale: 2,
        nullable: false
    })
    amount: number

    @ManyToOne(type => Category, category => category.expenses)
    @JoinColumn({name: "category_id"})
    category: Category;
}
