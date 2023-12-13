import { ObjectId } from "mongoose";

export class Comment {
    _id: ObjectId;
    description: string;
    autorEmail: string;
    id_task: ObjectId;
}