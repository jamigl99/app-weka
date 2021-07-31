import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../servicios/api/api.service';
import { PeticiónI } from '../../modelos/petición.interface';
import { HierarchicalClusterI } from '../../modelos/HierarchicalCluster.interface';

import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  hierClus!: HierarchicalClusterI;

  peticionForm = new FormGroup({
      link : new FormControl(''),
      clusters : new FormControl('')
  })

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }

  mostrar(form:PeticiónI){
    this.api.getAllClusters(form).subscribe(data =>{
      this.hierClus =data;
    })
  }

  verDetalle(){
    this.router.navigate(['detalle']);
  }

/*   verDetalleCluster(indice:number){
    this.router.navigate(['detalleCluster'])
  } */
  
}
