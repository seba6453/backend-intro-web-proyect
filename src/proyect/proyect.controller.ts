import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpException } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { BodyTeam } from './entities/bodyAddTeam.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Proyect } from '../schema/proyect.schema';
import { Team } from 'src/team/entity/team.entity';
import { UpdateTeamDto } from 'src/team/dto/update-team.dto';
import { HttpStatusCode } from 'axios';


@ApiTags('Proyect')
@ApiBearerAuth()
@Controller('proyect')
export class ProyectController {
  constructor(private readonly proyectService: ProyectService) {}

  @ApiOperation({ summary: 'Crea un nuevo proyecto' })
  @ApiBody({ type: CreateProyectDto })
  @ApiResponse({ status: 201, type: Proyect })
  @Post()
  create(@Body() createProyectDto: CreateProyectDto, @Req() request: Request): Promise<Proyect> {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.create(createProyectDto, token);
    }catch(error){
      console.error('Error en create:', error);
      throw new HttpException('No fue posible crear el proyecto', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Obtiene todos los proyectos del usuario' })
  @ApiResponse({ status: 200, type: Proyect, isArray: true })
  @Get()
  findAll(@Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.findAll(token);
    }catch(error){
      console.error('Error en findAll:', error);
      throw new HttpException('No fue posible obtener todos los proyecto del usuario', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Actualiza un proyecto por su ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID del proyecto' })
  @ApiBody({ type: UpdateProyectDto })
  @ApiResponse({ status: 200, type: Proyect })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectDto: UpdateProyectDto, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.update(id, updateProyectDto, token);
    }catch(error){
      console.error('Error en update:', error);
      throw new HttpException('No fue posible Actualizar un proyecto por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Elimina un proyecto por su ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID del proyecto' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.remove(id, token);
    }catch(error){
      console.error('Error en remove:', error);
      throw new HttpException('No fue posible Eliminar un proyecto por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Añade un equipo a un proyecto' })
  @ApiBody({ type: BodyTeam })
  @ApiResponse({ status: 200, type: Team })
  @Post('/addteam')
  addTeam(@Body() body: BodyTeam, @Req() request: Request){
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.addTeam(body, token);
    }catch(error){
      console.error('Error en addTeam:', error);
      throw new HttpException('No fue posible Añadir un equipo a un proyecto', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Elimina un equipo de un proyecto por su ID' })
  @ApiParam({ name: 'idteam', required: true, description: 'ID del equipo' })
  @ApiResponse({ status: 200 })
  @Delete('/deleteteam/:idteam')
  deleteTeam(@Param('idteam') idteam: string, @Req() request: Request){
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.deleteTeam(idteam, token);
    }catch(error){
      console.error('Error en deleteTeam:', error);
      throw new HttpException('No fue posible Eliminar un equipo de un proyecto por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Obtiene todos los equipos de un proyecto por su ID' })
  @ApiParam({ name: 'idproyect', required: true, description: 'ID del proyecto' })
  @ApiResponse({ status: 200, type: Team, isArray: true })
  @Get('/teams/:idproyect')
  findTeamsProyect(@Param('idproyect') idproyect: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.findTeamProyect(idproyect, token);
    }catch(error){
      console.error('Error en findTeamsProyect:', error);
      throw new HttpException('No fue posible Obtener todos los equipos de un proyecto por su ID', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Elimina todos los equipos con el nombre especificado del sistema' })
  @ApiParam({ name: 'nameteam', required: true, description: 'Nombre del equipo' })
  @ApiResponse({ status: 200 })
  @Post('/teams/:nameteam')
  deleteTeamMay(@Param('nameteam') nameteam: string, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.deleteTeamMany(nameteam,token);
    }catch(error){
      console.error('Error en deleteTeamMay:', error);
      throw new HttpException('No fue posible Eliminar todos los equipos con el nombre especificado del sistema', HttpStatusCode.BadRequest);
    }
  }

  @ApiOperation({ summary: 'Actualiza el nombre de un equipo' })
  @ApiParam({ name: 'name', required: true, description: 'Nombre del equipo' })
  @ApiBody({ type: UpdateProyectDto })
  @ApiResponse({ status: 200, type: Team })
  @Patch('team/:nameteam')
  updateTeam(@Param('nameteam') nameteam: string, @Body() updateTeam: UpdateTeamDto, @Req() request: Request) {
    try{
      const token = request.headers['authorization'].split(" ")[1];
      return this.proyectService.updateTeamMany(nameteam,token, updateTeam);
    }catch(error){
      console.error('Error en updateTeam:', error);
      throw new HttpException('No fue posible Actualizar el nombre de un equipo', HttpStatusCode.BadRequest);
    }
  }
}
