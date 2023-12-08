import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from 'src/schema/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {

    constructor(
        @InjectModel(Team.name) private readonly teamModel: Model<Team>
    ){}

    async create(createTeamDto: CreateTeamDto) {
        return this.teamModel.create(createTeamDto);
    }

    async delete(id: string) {
        return this.teamModel.deleteOne({id_team_ms: id});
    }

    async findTeamProyect(idProyect: string) {
        return this.teamModel.find({id_proyect: idProyect}).exec();
    }

    async deleteTeamMany(nameTeam: string){
        return await this.teamModel.deleteMany({name: nameTeam});
    }

    async updateTeamMany(nameTeam: string, newNameTeam: string) {
        return await this.teamModel.updateMany({name: nameTeam}, {name: newNameTeam});
    }

    async includesProyectTeam(nameTeam: string, id_proyect: string){
        const teams = await this.findTeamProyect(id_proyect);
        return teams.some((team) => {
            team.name === nameTeam
        });
    }

}
