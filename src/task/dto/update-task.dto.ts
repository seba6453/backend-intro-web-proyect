import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsEmail } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    
    @IsEmail()
    emailCreador?: string;
    startDate?: string;
    endDate?: string;
}
