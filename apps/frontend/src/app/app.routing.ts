import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ExamComponent } from './pages/exam/exam.component';
import { MainComponent } from './pages/main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {SkillComponent} from './pages/skill/skill.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'dash', loadChildren: () => import('./pages/dash/dash.module').then(m => m.DashModule), canActivate: [AuthGuard] },
  { path: 'skill', component: SkillComponent, canActivate: [AuthGuard] },
  { path: 'exam', component: ExamComponent},
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
