import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImagenesServices } from './services/imagenes.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ImagenesServices],
  bootstrap: [AppComponent],
})
export class AppModule {}
