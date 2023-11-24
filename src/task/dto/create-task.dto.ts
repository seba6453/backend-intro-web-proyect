import { IsNotEmpty, IsOptional, IsString, IsDate, IsBoolean } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  emailCreator: string;

  @IsString()
  @IsOptional()
  nameResponsible: string | null;

  @IsDate()
  @IsOptional()
  startDate: string | null;

  @IsDate()
  @IsOptional()
  endDate: string | null;

  @IsBoolean()
  @IsOptional()
  is_deleted: boolean;
}
