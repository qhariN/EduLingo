import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashRoutingModule } from './dash.routing';
import { DashComponent } from './dash.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';
import { LearnComponent } from './components/learn/learn.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashComponent, ForbiddenComponent, NotimplementedComponent, LearnComponent],
  imports: [
    CommonModule,
    DashRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    NgbModule
  ]
})
export class DashModule { }
