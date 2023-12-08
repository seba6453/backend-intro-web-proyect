import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ trim: true, required: true })
  id_proyect: string;

  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true })
  id_team_ms: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

TeamSchema.index({ id_proyect: 1, name: 1, id_team_ms: 1 }, { unique: true });