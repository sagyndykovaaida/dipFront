import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';

import { AppComponent } from './app.component';

const icons = [UserOutline, LockOutline];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NzIconModule.forRoot(icons),
  ],
  providers: [],
  bootstrap: [AppComponent] // Bootstrapping the root standalone component
})
export class AppModule { }
