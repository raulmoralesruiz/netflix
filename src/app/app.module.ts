import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { AdminComponent } from './features/admin/components/admin/admin.component';
import { MenuComponent } from './features/menu/components/menu/menu.component';
import { SignupComponent } from './features/login/components/signup/signup.component';
import { WelcomeComponent } from './features/welcome/components/welcome/welcome.component';
import { FooterComponent } from './features/menu/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    MenuComponent,
    SignupComponent,
    WelcomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
