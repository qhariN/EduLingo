import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { MainComponent } from './pages/main/main.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SkillComponent } from './pages/skill/skill.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, MainComponent, NotfoundComponent, SkillComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AuthModule.forRoot({
      domain: 'wanna.auth0.com',
      clientId: 'wjEIF235s4K6W5XHeq7BCTWIDAwI4bcq',
      redirectUri: window.location.origin,
      audience: 'https://edulingo-staging.herokuapp.com',
      httpInterceptor: {
        //* list of endpoints where Auth0 SDK will send auth header
        allowedList: [
          `${environment.url}/*`
        ]
      }
    }),
    NgbModule,
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
