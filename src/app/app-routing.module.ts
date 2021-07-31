import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent} from './vistas/dashboard/dashboard.component';
import { DetalleComponent } from './vistas/detalle/detalle.component';
import { DetalleClusterComponent } from './vistas/detalle-cluster/detalle-cluster.component';


const routes: Routes = [
  { path:'' ,redirectTo:'dashboard', pathMatch:'full'},
  { path:'dashboard' , component:DashboardComponent},
  { path:'detalle' , component:DetalleComponent},
  { path:'detalle-cluster' , component:DetalleClusterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,DetalleComponent,DetalleClusterComponent]