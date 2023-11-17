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
        return this.teamModel.deleteOne({_id: id});
    }

    async findTeamProyect(idProyect: string) {
        return this.teamModel.find({id_proyect: idProyect}).exec();
    }

}
