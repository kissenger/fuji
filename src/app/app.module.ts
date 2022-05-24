import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    ErrorService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
