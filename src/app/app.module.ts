import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IatecAudioWavePlayerModule } from 'iatec-audio-wave-player';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IatecAudioWavePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  