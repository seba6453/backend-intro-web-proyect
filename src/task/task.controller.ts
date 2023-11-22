import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { TaskState } from './entities/TaskState.enum';


@ApiTags('Task')
@ApiBearerAuth()
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    console.log(createTaskDto);
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.create(createTaskDto, token);
  }

  @Get(':id_proyect')
  findAll(@Param('id_proyect') id_proyect: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.findAll(id_proyect, token);
  }

  @Get(':id_task')
  findOne(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.findOne(id_task, token);
  }

  @Patch(':id_task')
  update(@Param('id_task') id_task: string, @Body() updateTaskDto: UpdateTaskDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.update(id_task, updateTaskDto, token);
  }

  @Delete(':id_task')
  remove(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.remove(id_task, token);
  }

  @Patch(':id_task')
  initTask(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.initTask(id_task, token);
  }

  @Patch(':id_task')
  finishTask(@Param('id_task') id_task: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.finishTask(id_task, token);
  }

  @Get('search')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'nameResponsible', required: false })
  searchTasks(@Query() query: Record<string, any>, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.taskService.searchTasks(query, token);
  }
}
