import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class AdminEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

}