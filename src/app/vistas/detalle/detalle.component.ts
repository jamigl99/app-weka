import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { ClusteredInstancesI } from '../../modelos/ClusteredInstances.interface';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { PeticiónI } from '../../modelos/petición.interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  instances!: ClusteredInstancesI;
  link:any;
  clusters:any;

  constructor(private api:ApiService, private router:Router, private activatedrouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.api.getAllInstances().subscribe(data =>{
      this.instances = data;
    })
/*     this.link = this.activatedrouter.snapshot.paramMap.get('link');
    this.clusters = this.activatedrouter.snapshot.paramMap.get('clusters');

    console.log(this.link, this.clusters); */
  }

  salir(){
    this.router.navigate(['dashboard']);
  }

}
