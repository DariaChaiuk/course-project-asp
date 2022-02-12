import { User } from "./user.intreface";

export interface Plan{
    id : number;
    title: string;
    description: string;
    statusId: number;
    createdDate: Date;
    userId: number;
}

export enum Status {
    planned = 1,
    progress = 2,
    done = 3
};