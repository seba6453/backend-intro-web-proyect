import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskState } from '../task/entities/TaskState.enum'

export type TaskDocument = HydratedDocument<Task>;


@Schema()
export class Task {
  @Prop({ trim: true })
  name: string;

  @Prop({required: true,trim: true })
  description: string;

  @Prop({ type: Date, default: null, trim: true })
  startDate: Date;

  @Prop({ type: Date, default: null, trim: true })
  endDate: Date;

  @Prop({ enum: TaskState, default: TaskState.TODO, trim: true })
  state: TaskState;

  @Prop({required: true, trim: true })
  emailCreator: string;

  @Prop({ trim: true, default: null })
  nameResponsible: string | null;

  @Prop({ ref: 'Proyect', trim: true, required: true })
  id_proyect: string; 

  @Prop({ default: false, trim: true })
  is_deleted: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
