import { IsNotEmpty, IsOptional, IsString, IsDate, IsBoolean } from 'class-validator';
import { TaskState } from '../entities/TaskState.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  id_proyect: string;

  @IsString()
  @IsOptional()
  emailCreator: string;

  @IsString()
  @IsOptional()
  state: TaskState = TaskState.TODO;

  @IsString()
  @IsOptional()
  nameResponsible: string | null = null;

  @IsString()
  @IsOptional()
  startDate: string | null = null;

  @IsString()
  @IsOptional()
  endDate: string | null = null;

  @IsBoolean()
  @IsOptional()
  is_deleted: boolean = false;
}

