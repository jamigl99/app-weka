import { Injectable } from '@angular/core';
import { PeticiónI } from '../../modelos/petición.interface';
import { ClusteredInstancesI} from '../../modelos/ClusteredInstances.interface';
import { HierarchicalClusterI } from '../../modelos/HierarchicalCluster.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://apiweka-springboot.herokuapp.com/api/hierarchical/";

  constructor(private http:HttpClient) { }

  getAllClusters(form:any):Observable<HierarchicalClusterI>{
    let direccion = this.url;
    return this.http.post<HierarchicalClusterI>(direccion, form);
  }

  getAllInstances():Observable<ClusteredInstancesI>{
    let direccion = this.url + "list";
    return this.http.post<ClusteredInstancesI>(direccion,'');
  }

}
