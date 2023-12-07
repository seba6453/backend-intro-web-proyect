import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskState } from '../task/entities/TaskState.enum'

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ default: null, trim: true })
  startDate: string;

  @Prop({ default: null, trim: true })
  endDate: string;

  @Prop({ default: TaskState.TODO, trim: true, required: true })
  state: string;

  @Prop({ required: true, trim: true })
  emailCreator: string;

  @Prop({ trim: true, default: null })
  nameResponsible: string | null;

  @Prop({ ref: 'Proyect', trim: true, required: true })
  id_proyect: string; 

  @Prop({ default: false, trim: true, required: true })
  is_deleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
