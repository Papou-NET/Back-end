import { IsNotEmpty } from "class-validator";


export class loginDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}