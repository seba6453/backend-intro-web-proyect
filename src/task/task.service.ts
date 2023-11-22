import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtService } from '@nestjs/jwt';
import { Task } from 'src/schema/task.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { decodeToken } from 'src/config/token';
import { User } from 'src/proyect/entities/user.entity';
import { ProyectService } from 'src/proyect/proyect.service';
import { TaskState } from './entities/TaskState.enum';
import { isValidDateFormat } from 'src/config/date';

@Injectable()
export class TaskService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly proyectService: ProyectService
  ){}


  async create(createTaskDto: CreateTaskDto, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    createTaskDto.emailCreator = userToken.email;

    console.log(createTaskDto);
    return await this.taskModel.create(createTaskDto);
  }

  async findAll(id_proyect: string, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const listTask: Task[] = await this.taskModel.find({id_proyect: id_proyect}).exec();

    return listTask.map(task => task.is_deleted === false);
  }

  async findOne(id: string, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return await this.taskModel.findOne({_id: id});
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    if(updateTaskDto.startDate){
      if(!isValidDateFormat(updateTaskDto.startDate)){
        throw new Error('Formato de fecha invalido, formato dd/mm/yyyy.');
      }
    }

    if(updateTaskDto.endDate){
      if(!isValidDateFormat(updateTaskDto.endDate)){
        throw new Error('Formato de fecha invalido, dd/mm/yyyy.');
      }
    }

    return await this.taskModel.updateOne({_id: id}, updateTaskDto);
  }

  async remove(id: string, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return await this.taskModel.updateOne({_id: id}, {is_delete: true});
  }

  async initTask(id: string, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    return await this.taskModel.updateOne({_id:id}, {state: TaskState.IN_PROGRESS});
  }

  async finishTask(id: string, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return await this.taskModel.updateOne({_id:id}, {state: TaskState.DONE});
  }

  async searchTasks(filter: Partial<FilterQuery<Task>>, token: string) {
    const userToken: User = decodeToken(token, this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    if (filter.state && !Object.values(TaskState).includes(filter.state)) {
      throw new Error('Estado de tarea no válido.');
    }

    const listTask: Task[] = await this.taskModel.find(filter).exec();


    return listTask.filter(task => !task.is_deleted);
  }

}
