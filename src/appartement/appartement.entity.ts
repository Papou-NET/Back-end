import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Immeuble } from 'src/immeuble/immeuble.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';

@Entity()
export class Appartement {
  @PrimaryGeneratedColumn()
  idAppart: number;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.appartements , {eager: true})
  immeuble: Immeuble;

  @OneToMany(
    type => Reservation,
    (reservation) => reservation.appartement,
    {
      nullable: true,
      cascade: true
    }
  )
  reservations: Reservation[]

  @Column()
  lotAppart: string;

  @Column('float')
  surfaceAppart: number;

  @Column()
  typologieAppart: string;

  @Column('int')
  etageAppart: number;

  @Column()
  statutAppart: string;
}
