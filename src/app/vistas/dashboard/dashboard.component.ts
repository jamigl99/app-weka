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
  link_local:any;
  clusters_local:any;

  peticionForm = new FormGroup({
      link : new FormControl(''),
      clusters : new FormControl('')
  })

  constructor(private api:ApiService, private router:Router, private dataS:DataService) { }

  ngOnInit(): void {
    this.links = this.dataS.getLinks();
    this.link_local = localStorage.getItem('link');
    this.clusters_local = localStorage.getItem('clusters');
    if ( this.link_local != undefined || this.clusters_local != undefined ){
      console.log("Variables contienen valor");
      console.log(this.link_local, this.clusters_local);
      this.peticionForm.setValue({
        link: this.link_local,
        clusters: this.clusters_local,
      });
      this.mostrar(this.peticionForm.value);
      localStorage.clear();
    }
    else{
      console.log("Variables no contienen valor");
    }
    console.log(localStorage.getItem('link'), localStorage.getItem('clusters'));
  }

  mostrar(form:PeticiónI){
    this.api.getAllClusters(form).subscribe(data =>{
      this.hierClus =data;
      this.hierClus.clusters.sort((a, b) => (a.tamanio < b.tamanio)? 1 : -1);
    })
    localStorage.setItem('link',form.link);
    localStorage.setItem('clusters', form.clusters.toString());
    console.log(localStorage.getItem('link'), localStorage.getItem('clusters'));
  }

  verDetalle(form:PeticiónI){
    this.router.navigate(['detalle']);
    console.log(form);
  }

  Limpiar(){
    this.peticionForm.reset();
    this.hierClus.clusters = [];
    this.hierClus.n_clusters = 0;
    this.hierClus.n_instancias = 0;
  }

/*   verDetalleCluster(indice:number){
    this.router.navigate(['detalleCluster'])
  } */
  
}
