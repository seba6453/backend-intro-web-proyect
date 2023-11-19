import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProyectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    owner?: string;
}
