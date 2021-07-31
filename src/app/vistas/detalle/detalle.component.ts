import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { ClusteredInstancesI } from '../../modelos/ClusteredInstances.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  instances!: ClusteredInstancesI;

  constructor(private api:ApiService, private router:Router) { }

  ngOnInit(): void {
    this.api.getAllInstances().subscribe(data =>{
      this.instances = data;
    })
  }

}
