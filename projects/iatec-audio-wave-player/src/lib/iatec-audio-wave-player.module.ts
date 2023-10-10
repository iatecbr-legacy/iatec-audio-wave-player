import { NgModule } from '@angular/core';
import { IatecAudioWavePlayerComponent } from './iatec-audio-wave-player.component';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    IatecAudioWavePlayerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  exports: [
    IatecAudioWavePlayerComponent
  ]
})
export class IatecAudioWavePlayerModule { }
