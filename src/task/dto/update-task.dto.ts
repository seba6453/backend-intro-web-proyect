import { IsOptional, IsString, IsDate, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  nameResponsible?: string | null;

  @IsString()
  @IsOptional()
  startDate?: string | null;

  @IsString()
  @IsOptional()
  endDate?: string | null;

  @IsString()
  @IsOptional()
  state?: string | null;

  @IsString()
  @IsOptional()
  emailCreator?: string | null
}
