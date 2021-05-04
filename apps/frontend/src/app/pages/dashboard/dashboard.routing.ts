import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';
import { ProfileOptionUtilGuard } from '@nx-angular/utils';
import { acc } from '@guards/access';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'inicio', component: InicioComponent, canActivate: [ProfileOptionUtilGuard], data: { codMenu: acc.inicio.cod } },
      { path: '403', component: ForbiddenComponent },
      { path: '**', component: NotimplementedComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
