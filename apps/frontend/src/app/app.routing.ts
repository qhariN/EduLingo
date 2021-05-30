import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { MainComponent } from './pages/main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import {SkillComponent} from './pages/skill/skill.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'learn', loadChildren: () => import('./pages/learn/learn.module').then(m => m.LearnModule), canActivate: [AuthGuard] },
  { path: 'skill/:unit/:session/practice', component: SkillComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
