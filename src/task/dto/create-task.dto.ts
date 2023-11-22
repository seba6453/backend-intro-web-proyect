import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    id_proyect: string;

    emailCreator?: string;
}
