import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Immeuble } from 'src/immeuble/immeuble.entity';

@Entity()
export class Appartement {
  @PrimaryGeneratedColumn()
  idAppart: number;

  @ManyToOne(() => Immeuble, (immeuble) => immeuble.appartements)
  immeuble: Immeuble;

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
