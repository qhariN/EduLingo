import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmComponent } from './adm.component';
import { LearnComponent } from './components/learn/learn.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';
import { TipsComponent } from './components/tips/tips.component';
import { SessionComponent } from './components/session/session.component';

const routes: Routes = [
  {
    path: '', component: AdmComponent, children: [
      { path: 'learn', component: LearnComponent },
      { path: 'tips', component: TipsComponent },
      { path: 'session', component: SessionComponent },
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
