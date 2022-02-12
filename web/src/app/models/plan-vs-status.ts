import { Plan } from "./plan.inteface";

export interface PlanVsStatus{
    statusId: number;
    statusName: string;
    plans: Plan[];
}