import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('tb_user')
export class User
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false
    })
    name: string;

    @Column({
        type: 'character varying',
        length: 255,
    })
    last_name: string;

    @Column({
        type: 'character varying',
        length: 50,
        nullable: false
    })
    document: string;

    @Column({
        type: 'numeric',
        nullable: false,
        precision: 3,
        scale: 0,
        name: 'age'
    })
    years_old: number;
}