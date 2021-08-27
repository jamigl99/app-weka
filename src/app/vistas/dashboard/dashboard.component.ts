import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { PeticiónI } from '../../modelos/petición.interface';
import { HierarchicalClusterI } from '../../modelos/HierarchicalCluster.interface';
import { LinkI } from '../../modelos/links.interface';
import { DataService } from '../../servicios/api/data.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService]
})
export class DashboardComponent implements OnInit {

  hierClus!: HierarchicalClusterI;
  selectedLink: LinkI = { id: 0, criterio: '' };
  links!: LinkI[];
  link_local: any;
  clusters_local: any;
  imgUrl!: SafeResourceUrl;
  imagen: any;
  peticion:any;

  peticionForm = new FormGroup({
    link: new FormControl(''),
    clusters: new FormControl('')
  })
  

  constructor(private api: ApiService, private router: Router, private dataS: DataService, private domSanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.links = this.dataS.getLinks();
    this.link_local = localStorage.getItem('link');
    this.clusters_local = localStorage.getItem('clusters');
    this.imagen = localStorage.getItem('img');
    console.log(this.imagen);
    if (this.link_local != undefined && this.clusters_local != undefined && this.imagen != undefined) {
      console.log("Variables contienen valor");
      console.log(this.link_local, this.clusters_local);
      this.peticionForm.setValue({
        link: this.link_local,
        clusters: this.clusters_local,
      });
      this.mostrar(this.peticionForm.value);
      localStorage.clear();
    }
    else {
      console.log("Variables no contienen valor");
    }
    console.log(localStorage.getItem('link'), localStorage.getItem('clusters'), localStorage.getItem('img'));
  }

  mostrar(form:any) {
    this.peticion = this.completarJson(form.link, form.clusters);
    console.log(this.peticion);
    this.api.getAllClusters(this.peticion).subscribe(data => {
      this.hierClus = data;
      console.log(this.hierClus);
      this.hierClus.clusters.sort((a, b) => (a.tamanio < b.tamanio) ? 1 : -1);
      localStorage.setItem('link', form.link);
      localStorage.setItem('clusters', form.clusters.toString());
      console.log(localStorage.getItem('link'), localStorage.getItem('clusters'));
      this.imagen = 'data:image/png;base64,'
        + this.hierClus.image;
      localStorage.setItem('img', this.imagen);
      console.log(this.imagen);
    })
  }
  
  verDetalle(form: PeticiónI) {
    this.router.navigate(['detalle']);
    console.log(form);
  }

  completarJson(link:string, clusters:number){
    return ({
      "columns": [
          "htitulo_cat",
          "titulo",
          "empresa"
      ],
      "jerarq-method": link,
      "aglo-affinity": "euclidean",
      "aglo-linkage": link,
      "n_clusters": clusters
  })
  }

  Limpiar() {
    this.peticionForm.reset();
    this.hierClus.clusters = [];
    this.hierClus.n_clusters = 0;
    this.hierClus.n_instancias = 0;
    this.imagen = undefined;
    localStorage.clear();
    console.log(this.hierClus.clusters);
    console.log(this.hierClus.n_clusters);
    console.log(this.hierClus.n_instancias);
    console.log(this.imagen);
  }

  /*   verDetalleCluster(indice:number){
      this.router.navigate(['detalleCluster'])
    } */

}
