import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { BodyTeam } from './entities/bodyAddTeam.entity';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Proyect } from '../schema/proyect.schema';


@ApiTags('ProyectE')
@ApiBearerAuth()
@Controller('proyect')
export class ProyectController {
  constructor(private readonly proyectService: ProyectService) {}

  @Post()
  create(@Body() createProyectDto: CreateProyectDto, @Req() request: Request): Promise<Proyect> {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.create(createProyectDto, token);
  }

  @Get()
  findAll(@Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.findAll(token);
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

  @Post('/addteam')
  addTeam(@Body() body: BodyTeam, @Req() request: Request){
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.addTeam(body, token);
  }

  @Delete('/deleteteam/:idteam')
  deleteTeam(@Param('idteam') idteam: string, @Req() request: Request){
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.deleteTeam(idteam, token);
  }

  @Get('/teams/:idproyect')
  findTeamsProyect(@Param('idproyect') idproyect: string, @Req() request: Request) {
    const token = request.headers['authorization'].split(" ")[1];
    return this.proyectService.findTeamProyect(idproyect, token);
  }
}
