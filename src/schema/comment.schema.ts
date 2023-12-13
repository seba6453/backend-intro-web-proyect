import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TaskDocument } from './task.schema';

export type CommentDocument = Document & Comment;

@Schema()
export class Comment {
  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, trim: true })
  autorEmail: string;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true }) // Referencia al esquema Task
  id_task: TaskDocument['_id'];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
