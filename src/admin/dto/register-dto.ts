import { IsEmail, IsNotEmpty } from "class-validator";


export class registerDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}