import { ClusterI } from "./Cluster.interface";

export interface HierarchicalClusterI{
    n_instancias:number;
    n_clusters:number;
    clusters:ClusterI[];
}
