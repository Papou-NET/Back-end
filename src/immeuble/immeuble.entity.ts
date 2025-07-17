import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appartement } from 'src/appartement/appartement.entity';

@Entity()
export class Immeuble {
  @PrimaryGeneratedColumn()
  idImmeuble: number;

  @Column()
  numImmeuble: string;

  @OneToMany(() => Appartement, appartement => appartement.immeuble)
  appartements: Appartement[];
}
