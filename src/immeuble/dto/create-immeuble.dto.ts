import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImmeubleDto {
  @IsNotEmpty()
  @IsString()
  numImmeuble: string;
}
