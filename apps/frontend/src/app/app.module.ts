import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: 'wanna.auth0.com',
      clientId: 'wjEIF235s4K6W5XHeq7BCTWIDAwI4bcq'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
