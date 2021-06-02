import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashComponent } from './dash.component';
import { LearnComponent } from './components/learn/learn.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';

const routes: Routes = [
  {
    path: '', component: DashComponent, children: [
      { path: 'learn', component: LearnComponent },
      { path: '403', component: ForbiddenComponent },
      { path: '**', component: NotimplementedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashRoutingModule { }
