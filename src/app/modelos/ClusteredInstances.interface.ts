import { InstanceI } from "./Instance.interface";

export interface ClusteredInstancesI{
    n_clusters:number;
    atributos:string[];
    instances:InstanceI[];
}