import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { HttpStatusCode } from 'axios';


@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @ApiOperation({ summary: 'Crea una nueva tarea' })
  @ApiBody({ type: CreateTaskDto }) // Tipo de dato esperado en el body
  @ApiResponse({ status: 201, type: Task }) // Tipo de dato retornado
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.taskService.create(createTaskDto, token);
    }catch (error){
      console.error('Error en create:', error);
      throw new HttpException('No fue posible Crear una nueva tarea', HttpStatusCode.BadRequest);
    }
    
  }

  @ApiOperation({ summary: 'Obtiene todas las tareas de un proyecto' })
  @ApiQuery({ name: 'id_proyect', required: true, description: 'ID del proyecto' })
  @ApiResponse({ status: 200, type: Task, isArray: true })
  @Get(':id_proyect')
  findAll(@Param('id_proyect') id_proyect: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.taskService.findAll(id_proyect, token);
    }catch (error){
      console.error('Error en findAll:', error);
      throw new HttpException('No fue posible Obtener todas las tareas de un proyecto', HttpStatusCode.BadRequest);
    }
  }


  @ApiOperation({ summary: 'Obtiene una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':id_task')
  findOne(@Param('id_task') id_task: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.taskService.findOne(id_task, token);
    }catch (error){
      console.error('Error en findOne:', error);
      throw new HttpException('No fue posible Obtener una tarea por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Actualiza una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiBody({ type: UpdateTaskDto }) // Tipo de dato esperado en el body
  @ApiResponse({ status: 200, type: Task })
  @Patch(':id_task')
  update(@Param('id_task') id_task: string, @Body() updateTaskDto: UpdateTaskDto, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.taskService.update(id_task, updateTaskDto, token);
    }catch (error){
      console.error('Error en update:', error);
      throw new HttpException('No fue posible Actualizar una tarea por su ID', HttpStatusCode.BadRequest);
    }
    
  }

  @ApiOperation({ summary: 'Elimina una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200 })
  @Delete(':id_task')
  async remove(@Param('id_task') id_task: string, @Req() request: Request): Promise<ResponseOk> {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      const responseUpdate = await this.taskService.remove(id_task, token);
      if(responseUpdate.modifiedCount == 0){
        throw new HttpException('No fue posible Eliminar una tarea por su ID', HttpStatusCode.BadRequest);
      }
      return { message: "Tarea eliminada", statusCode: HttpStatusCode.Ok }
    }catch (error){
      console.error('Error en remove:', error);
      throw new HttpException('No fue posible Eliminar una tarea por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Inicializa una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, type: Task })
  @Patch('init/:id_task')
  initTask(@Param('id_task') id_task: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.taskService.initTask(id_task, token);
    }catch (error){
      console.error('Error en initTask:', error);
      throw new HttpException('No fue posible Inicializar una tarea por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Finaliza una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, type: Task })
  @Patch('finish/:id_task')
  finishTask(@Param('id_task') id_task: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.taskService.finishTask(id_task, token);
    }catch (error){
      console.error('Error en finishTask:', error);
      throw new HttpException('No fue posible Finalizar una tarea por su ID', HttpStatusCode.BadRequest);
    }
  }

}
