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
import { TipsComponent } from './components/tips/tips.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashComponent, ForbiddenComponent, NotimplementedComponent, LearnComponent, TipsComponent],
  imports: [
    CommonModule,
    DashRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ]
})
export class DashModule { }
