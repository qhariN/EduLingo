import { SharedModule } from './shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { SkillComponent } from './pages/skill/skill.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExamComponent } from './pages/exam/exam.component';
import { ModalResultsComponent } from './shared/layout/modal-results/modal-results.component';

@NgModule({
  declarations: [AppComponent, MainComponent, NotfoundComponent, SkillComponent, ExamComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalResultsComponent]
})
export class AppModule {}
