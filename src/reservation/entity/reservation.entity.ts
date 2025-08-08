import { Appartement } from "src/appartement/appartement.entity";
import { Client } from "src/client/entity/client.entity";
import { TypeOffreEnum } from "src/enums/type-offre.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservation')
export class Reservation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reference: string;

    @Column({
        type:'enum',
        enum: TypeOffreEnum,
        default: TypeOffreEnum.VENTE
    })
    type: string;

    @Column({
        nullable: true
    })
    dateDeb: Date

    @Column({
        nullable: true
    })
    dateFin: Date

    @Column({
        nullable: true
    })
    dateVente: Date

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(
        type => Client,
        (client) => client.reservations,
        {
            nullable: true,
            eager: true,
            onDelete:'CASCADE'
        }
    )
    client: Client

    @ManyToOne(
        type => Appartement,
        (appartement) => appartement.reservations,
        {
            nullable: true,
            eager: true,
            onDelete:'CASCADE'
        }
    )
    appartement: Appartement
}