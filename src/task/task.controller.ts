import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskState } from './entities/TaskState.enum';
import { Task } from './entities/task.entity';


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
    console.log(createTaskDto);
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.create(createTaskDto, token);
  }

  @ApiOperation({ summary: 'Obtiene todas las tareas de un proyecto' })
  @ApiQuery({ name: 'id_proyect', required: true, description: 'ID del proyecto' })
  @ApiResponse({ status: 200, type: Task, isArray: true })
  @Get(':id_proyect')
  findAll(@Param('id_proyect') id_proyect: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.findAll(id_proyect, token);
  }


  @ApiOperation({ summary: 'Obtiene una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':id_task')
  findOne(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.findOne(id_task, token);
  }

  @ApiOperation({ summary: 'Actualiza una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiBody({ type: UpdateTaskDto }) // Tipo de dato esperado en el body
  @ApiResponse({ status: 200, type: Task })
  @Patch(':id_task')
  update(@Param('id_task') id_task: string, @Body() updateTaskDto: UpdateTaskDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.update(id_task, updateTaskDto, token);
  }

  @ApiOperation({ summary: 'Elimina una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200 })
  @Delete(':id_task')
  remove(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.remove(id_task, token);
  }

  @ApiOperation({ summary: 'Inicializa una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, type: Task })
  @Patch('init/:id_task')
  initTask(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.initTask(id_task, token);
  }

  @ApiOperation({ summary: 'Finaliza una tarea por su ID' })
  @ApiQuery({ name: 'id_task', required: true, description: 'ID de la tarea' })
  @ApiResponse({ status: 200, type: Task })
  @Patch('finish/:id_task')
  finishTask(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.finishTask(id_task, token);
  }

  @ApiOperation({ summary: 'Busca tareas por varios parámetros' })
  @ApiQuery({ name: 'name', required: false, description: 'Nombre de la tarea' })
  @ApiQuery({ name: 'state', required: false, description: 'Estado de la tarea' })
  @ApiQuery({ name: 'nameResponsible', required: false, description: 'Nombre del responsable de la tarea' })
  @ApiResponse({ status: 200, type: Task, isArray: true })
  @Get('search')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'nameResponsible', required: false })
  searchTasks(@Query() query: Record<string, any>, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.searchTasks(query, token);
  }
}
