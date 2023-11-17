import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { Team, TeamSchema } from 'src/schema/team.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [TeamService],
  imports: [MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }])],
  exports: [TeamService]
})
export class TeamModule {}
