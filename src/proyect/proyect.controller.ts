import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';

@Controller('proyect')
export class ProyectController {
  constructor(private readonly proyectService: ProyectService) {}

  @Post()
  create(@Body() createProyectDto: CreateProyectDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.create(createProyectDto, token);
  }

  @Get()
  findAll(@Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.findAll(token);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectDto: UpdateProyectDto, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.update(id, updateProyectDto, token);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.remove(id, token);
  }
}
