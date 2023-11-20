import { Injectable } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { Proyect } from 'src/schema/proyect.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { decodeToken } from 'src/config/token';
import { JwtService } from '@nestjs/jwt';
import { Team } from 'src/team/entity/team.entity';
import { fetchTeamOtherBackend } from 'src/fetchMicroService/getTeam';
import { TeamService } from 'src/team/team.service';
import { BodyTeam } from './entities/bodyAddTeam.entity';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { ProyectE } from './entities/proyect.entity';

@Injectable()
export class ProyectService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(Proyect.name) private readonly proyectModel: Model<Proyect>,
    private readonly teamService: TeamService
  ){}

  async create(createProyectDto: CreateProyectDto, token: string) {
    const userToken: User = decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    createProyectDto.owner = userToken.userName;
    return this.proyectModel.create(createProyectDto);
  }

  async findAll(token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    return await this.proyectModel.find({ owner: userToken.userName }).exec();
  }

  async update(id: string, updateProyectDto: UpdateProyectDto, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return this.proyectModel.updateOne({_id: id},updateProyectDto);
  }

  async remove(id: string, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return this.proyectModel.deleteOne({_id: id});
  }

  async addTeam(body: BodyTeam, token: string){
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    const proyect: ProyectE = await this.proyectModel.findOne({_id: body.id_proyect});
    if(proyect === null){
      throw new Error('Proyecto no existe en el sistema.');
    }

    const team: Team = await fetchTeamOtherBackend(token, body.uniqueCode);
    if(team.name === undefined){
      throw new Error('Team no existe en el sistema.');
    }
    const newTeam: CreateTeamDto = {
      id_proyect: proyect.id,
      name: team.name
    }

    return await this.teamService.create(newTeam);
  }

  async deleteTeam(idTeam: string, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    return this.teamService.delete(idTeam);
  }

  async findTeamProyect(idProyect: string, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }

    return this.teamService.findTeamProyect(idProyect);
  }

}
