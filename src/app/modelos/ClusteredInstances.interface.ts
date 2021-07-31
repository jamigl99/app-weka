export interface ClusteredInstancesI{
    n_clusters:number;
    atributos:string[];
    clusters:Map<number, string[]>;
}