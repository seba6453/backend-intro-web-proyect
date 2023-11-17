import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProyectDocument = HydratedDocument<Proyect>;

@Schema()
export class Proyect {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;
}

export const ProyectSchema = SchemaFactory.createForClass(Proyect);