import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
    @IsString()
    @IsNotEmpty()
    id_proyect: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    id_team_ms: string;
}
