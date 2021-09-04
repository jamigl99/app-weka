import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { ClusteredInstancesI } from '../../modelos/ClusteredInstances.interface';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticiónI } from '../../modelos/petición.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CargarScriptsService } from '../../servicios/api/cargar-scripts.service';
import { InstanceI } from 'src/app/modelos/Instance.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  instances!: ClusteredInstancesI;
  link: any;
  clusters: any;
  displayedColumns: string[] = [];
  columnas: string = "";
  atributos: any;
  col: any;
  dataSource!: InstanceI[];
  p: number = 1;
  searchValue: string = "";

  constructor(private api: ApiService, private router: Router, private activatedrouter: ActivatedRoute, private cargaScripts: CargarScriptsService, private spinnerService: NgxSpinnerService) {
    /*     cargaScripts.Carga(["/tablas"]);   */
  }

  ngOnInit(): void {
    this.spinnerFunction();
    this.api.getAllInstances().subscribe(data => {
      this.instances = data;
      this.displayedColumns = this.setColumns(this.instances.atributos);
      this.dataSource = this.instances.instances;
      console.log(this.displayedColumns);
      console.log(this.dataSource);
    })
  }

  setColumns(columns: string[]) {
    let titulo;
    for (let index = 0; index < columns.length; index++) {
      switch (columns[index]) {
        case 'htitulo_cat':
          columns[index] = 'Categoria';
          break;
        case 'htitulo':
          columns[index] = 'Título';
          break;
        case 'empresa':
          columns[index] = 'Empresa';
          break;
        case 'lugar':
          columns[index] = 'Lugar';
          break;
        case 'salario':
          columns[index] = 'Salario';
          break;
        case 'modalidad_trabajo':
          columns[index] = 'Modalidad de Trabajo';
          break;
        case 'modalidad_contrato':
          columns[index] = 'Modalidad de Contrato';
          break;
        case 'fecha_creacion':
          columns[index] = 'Fecha de Creación';
          break;
        case 'fecha_publicacion':
          columns[index] = 'Fecha de Publicación';
          break;
        case 'pagina_web':
          columns[index] = 'Página Web';
          break;
        case 'funciones':
          columns[index] = 'Funciones';
          break;
        case 'conocimiento':
          columns[index] = 'Conocimientos';
          break;
        case 'habilidades':
          columns[index] = 'Habilidades';
          break;
        case 'periodo':
          columns[index] = 'Periodo';
          break;
        case 'competencias':
          columns[index] = 'Competencias';
          break;
        case 'certificaciones':
          columns[index] = 'Certificaciones';
          break;
        case 'beneficio':
          columns[index] = 'Beneficios';
          break;
        case 'formacion':
          columns[index] = 'Formación';
          break;
        default:
          break;
      }
    }
    return columns;
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  spinnerFunction(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
    }, 3000);
  }

  salir() {
    this.router.navigate(['dashboard']);
  }
}