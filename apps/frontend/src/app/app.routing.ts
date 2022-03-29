import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamComponent } from './pages/exam/exam.component';
import { MainComponent } from './pages/main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {SkillComponent} from './pages/skill/skill.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dash', loadChildren: () => import('./pages/dash/dash.module').then(m => m.DashModule) },
  { path: 'skill', component: SkillComponent },
  { path: 'exam', component: ExamComponent},
  { path: 'adm', loadChildren: () => import('./pages/adm/adm.module').then(m => m.AdmModule) },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
