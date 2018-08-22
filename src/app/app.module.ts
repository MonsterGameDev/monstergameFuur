import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { DataService } from './admin/services/data.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    ReactiveFormsModule,
    HttpClientModule,
   RouterModule.forRoot([])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
