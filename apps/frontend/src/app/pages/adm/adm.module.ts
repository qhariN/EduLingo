import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashRoutingModule } from './adm.routing';
import { AdmComponent } from './adm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { NotimplementedComponent } from './components/notimplemented/notimplemented.component';
import { LearnComponent } from './components/learn/learn.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TipsComponent } from './components/tips/tips.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionComponent } from './components/session/session.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdmComponent, ForbiddenComponent, NotimplementedComponent, LearnComponent, TipsComponent, SessionComponent],
  imports: [
    CommonModule,
    DashRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ]
})
export class AdmModule { }
