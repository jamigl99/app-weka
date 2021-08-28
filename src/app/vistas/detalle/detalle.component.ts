import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { ClusteredInstancesI } from '../../modelos/ClusteredInstances.interface';
import { Router, ActivatedRoute, Event } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticiónI } from '../../modelos/petición.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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
  dataSource: any;
  p: number = 1;

  constructor(private api: ApiService, private router: Router, private activatedrouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.api.getAllInstances().subscribe(data => {
      this.instances = data;
      this.displayedColumns = this.setColumns(this.instances.atributos);
      this.dataSource = this.instances.instances;
      /*       this.atributos = this.setAtributos(this.instances.instances, this.displayedColumns.length); */
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
        case 'titulo':
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
        case 'pagina_Web':
          columns[index] = 'Página Web';
          break;
        case 'funciones':
          columns[index] = 'Funciones';
          break;
        case 'conocimientos':
          columns[index] = 'Conocimientos';
          break;
        default:
          break;
      }
      /*       this.col = {
              titulo: titulo, name: columns[index]
            }
            this.columnas += JSON.stringify(this.col); */
    }
    return columns;
  }

  /*   setAtributos(instances: any, tam:number) {
      console.log(instances);
      console.log(instances.length);
      console.log(tam);
      console.log(instances[0].attr0);
      var arregloAtributos = this.Create2DArray(instances.length, instances.length);
      for (let i = 0; i < instances.length; i++) {
        for (let j = 0; j < tam; j++) {
          arregloAtributos[i][j] = 1;
        }
      }
      return arregloAtributos;
    } */

  /*   Create2DArray(rows: number, columns: number) {
      var x = new Array(rows);
      for (var i = 0; i < rows; i++) {
        x[i] = new Array(columns);
      }
      return x;
    } */

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  salir() {
    this.router.navigate(['dashboard']);
  }
}