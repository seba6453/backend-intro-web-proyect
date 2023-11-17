import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Team>;

@Schema()
export class Team {
  @Prop({ unique: true, trim: true, required: true })
  id_proyect: string;

  @Prop({ unique: true, trim: true, required: true })
  name: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);