import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { PeticiónI } from '../../modelos/petición.interface';
import { HierarchicalClusterI } from '../../modelos/HierarchicalCluster.interface';
import { LinkI } from '../../modelos/links.interface';
import { DataService } from '../../servicios/api/data.service';
import { Router, RouterLinkWithHref, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { delay } from 'rxjs/operators';
import { SpinnerService } from 'src/app/servicios/api/spinner.service';



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
  query_local: any;
  imgUrl!: SafeResourceUrl;
  imagen: any;
  peticion: any;
  showLoadingIndicator = true;
  dimensiones: Array<String> = ['htitulo_cat', 'titulo', 'empresa', 'lugar', 'salario'];

  peticionForm = new FormGroup({
    link: new FormControl(''),
    clusters: new FormControl(''),
    query: new FormControl('')
  })


  constructor(private api: ApiService, private router: Router,
    private dataS: DataService, private domSanitizer: DomSanitizer, spinnerSvc: SpinnerService) {
  }

  ngOnInit(): void {
    this.links = this.dataS.getLinks();
    this.link_local = localStorage.getItem('link');
    this.clusters_local = localStorage.getItem('clusters');
    this.query_local = localStorage.getItem('query');
    this.imagen = localStorage.getItem('img');
    if (this.link_local != undefined && this.query_local != undefined && this.clusters_local != undefined && this.imagen != undefined) {
      this.peticionForm.setValue({
        link: this.link_local,
        clusters: this.clusters_local,
        query: this.query_local,
      });
      this.mostrar(this.peticionForm.value);
      localStorage.clear();
    }
    else {
    }

  }

  mostrar(form: any) {
    this.peticion = this.completarJson(form.link, form.clusters, form.query);
    this.api.getAllClusters(this.peticion).subscribe(data => {
      this.hierClus = data;
      this.hierClus.clusters.sort((a, b) => (a.tamanio < b.tamanio) ? -1 : 1);
      localStorage.setItem('link', form.link);
      localStorage.setItem('clusters', form.clusters.toString());
      localStorage.setItem('query', form.query);
      this.imagen = 'data:image/png;base64,'
        + this.hierClus.image;
      localStorage.setItem('img', this.imagen);
    })
  }

  verDetalle(form: PeticiónI) {
    this.router.navigate(['detalle']);
  }

  completarJson(link: string, clusters: number, query: string) {
    return ({
      "columns": [
        "htitulo_cat",
        "titulo",
        "empresa",
        "lugar",
        "salario",
        "modalidad_trabajo",
        "fecha_publicacion"
      ],
      "query": query,
      "jerarq-method": link,
      "aglo-affinity": "euclidean",
      "aglo-linkage": link,
      "n_clusters": clusters
    })
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }

  Limpiar() {
    this.peticionForm.reset();
    this.hierClus.clusters = [];
    this.hierClus.n_clusters = 0;
    this.hierClus.n_instancias = 0;
    this.imagen = undefined;
    localStorage.clear();
  }

}
