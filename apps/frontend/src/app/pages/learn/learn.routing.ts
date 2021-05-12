import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LearnComponent } from './learn.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';

const routes: Routes = [
  {
    path: '', component: LearnComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: '403', component: ForbiddenComponent },
      { path: '**', component: NotimplementedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnRoutingModule { }
