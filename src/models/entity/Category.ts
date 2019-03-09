import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Expense} from "./Expense";

@Entity('tb_category')
export class Category {
    
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

    @OneToMany(type => Expense, expense => expense.category)
    expenses: Expense[];
}
