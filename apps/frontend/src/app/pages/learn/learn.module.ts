import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearnRoutingModule } from './learn.routing';
import { LearnComponent } from './learn.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [LearnComponent, ForbiddenComponent, NotimplementedComponent, InicioComponent],
  imports: [
    CommonModule,
    LearnRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class LearnModule { }
