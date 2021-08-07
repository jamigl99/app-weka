import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../servicios/api/api.service';
import { PeticiónI } from '../../modelos/petición.interface';
import { HierarchicalClusterI } from '../../modelos/HierarchicalCluster.interface';
import { LinkI } from '../../modelos/links.interface';
import { DataService } from '../../servicios/api/data.service';

import { Router, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {

  hierClus!: HierarchicalClusterI;
  selectedLink: LinkI = {id:0, criterio:''};
  links!: LinkI[];

  peticionForm = new FormGroup({
      link : new FormControl(''),
      clusters : new FormControl('')
  })

  constructor(private api:ApiService, private router:Router, private dataS:DataService) { }

  ngOnInit(): void {
    this.links = this.dataS.getLinks();
  }

  mostrar(form:PeticiónI){
    this.api.getAllClusters(form).subscribe(data =>{
      this.hierClus =data;
      this.hierClus.clusters.sort((a, b) => (a.tamanio < b.tamanio)? 1 : -1);
    })
  }

  verDetalle(){
    this.router.navigate(['detalle']);
  }

/*   verDetalleCluster(indice:number){
    this.router.navigate(['detalleCluster'])
  } */
  
}
