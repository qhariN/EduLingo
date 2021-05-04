import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [DashboardComponent, ForbiddenComponent, NotimplementedComponent, InicioComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardModule { }
