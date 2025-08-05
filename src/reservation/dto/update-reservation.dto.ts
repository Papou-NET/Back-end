import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";
import { Appartement } from "src/appartement/appartement.entity";
import { Client } from "src/client/entity/client.entity";


export class UpdateReservationDTO {

    @IsOptional()
    reference: string;

   @IsOptional()
    type: string;

    @IsOptional()
    @IsDate()
    dateDeb: Date

    @IsOptional()
    @IsDate()
    dateFin: Date

    @IsOptional()
    @IsDate()
    dateVente: Date

    @IsOptional()
    @Type(()=>Client)
    client: Client;

    @IsOptional()
    @Type(()=>Appartement)
    appartement: Appartement;
}