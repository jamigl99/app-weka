import { Injectable } from '@angular/core';
import { LinkI} from "../../modelos/links.interface"; 

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private links:LinkI[]=[
    {
      id:1,
      criterio:"single"
    },
    {
      id:2,
      criterio:"complete"
    },
    {
      id:3,
      criterio:"average"
    },
    {
      id:4,
      criterio:"mean"
    },
    {
      id:5,
      criterio:"centroid"
    },
    {
      id:6,
      criterio:"ward"
    }
  ]
  constructor() { }

  getLinks(): LinkI[]{
    return this.links;
  }
}
