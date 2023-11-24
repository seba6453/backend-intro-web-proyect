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

  @IsDate()
  @IsOptional()
  startDate?: string | null;

  @IsDate()
  @IsOptional()
  endDate?: string | null;
}
