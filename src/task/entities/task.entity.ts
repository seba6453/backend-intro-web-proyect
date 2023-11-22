import { TaskState } from "./TaskState.enum";

export class Task {
    name: string;

    description: string;

    startDate: Date;

    endDate: Date;

    state: TaskState;

    creator: string;

    id_responsible: string | null;

    id_proyect: string;

    is_deleted: boolean;
}
