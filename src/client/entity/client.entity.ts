import { Reservation } from 'src/reservation/entity/reservation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenoms: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @Column()
  adresse: string;

  @Column()
  pays: string;

  @Column()
  ville: string;

  @Column()
  codePostal: string;
  
  @OneToMany(
    type => Reservation,
    (reservation) => reservation.client,
    {
      nullable: true,
      cascade: true
    }
  )
  reservations: Reservation[]
  
}
