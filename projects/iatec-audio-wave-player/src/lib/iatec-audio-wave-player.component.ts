import { AfterViewInit, Component, Input } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferOptions } from 'wavesurfer.js';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'iatec-audio-wave-player',
  templateUrl: './iatec-audio-wave-player.html',
  styles: [`
    .container-iatec-player {
      height: 45px;
    }

    .container-player {
      display: inline-block;
      border-radius: 30px;
      background-color: #e0e0e0;
      vertical-align: middle;
      padding: 5px 0;
    }
     
    .player {
      display: inline-block;
      width: 150px;
      vertical-align: middle;
    }
    .timer {
      display: inline-block;
      vertical-align: middle;
      color: #0e4a75;
      padding: 0 10px;
      font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
      font-size: 13px;
    }
    .play {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      color: #0e4a75;
      border: 0;      
      padding: 0 10px;
      cursor: pointer;
      font-size: 20px;
    }
    .play > svg {
      position: relative;
    }

    /* .play:before {
      content: "";
      background-color: #fff;
      display: block;
      position: absolute;
      width: 10px;
      height: 14px;
      top: 17px;
      left: 23px;
      z-index: 0;
    } */
    .play:hover {
      color: #1e78de;
    }

    .pause {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      color: #0e4e75;
      border: 0;
      padding: 0 10px;
      font-size: 20px;
    }

    .pause:hover {
      color: #1e78de;
    }

    .speed {
      display: inline-block;
      width: 25px;
      height: 25px;
      vertical-align: middle;
      border-radius: 50px;
      color: #fff;
      background-color: #0e4a75;
      border: 0;
      cursor: pointer;
      margin-left: 10px;
      font-size: 9px;
    }

    .speed:hover {
      background-color: #1e78de;
    }

    .header-tools, .footer-tools {
      display: inline-block;
      vertical-align: middle;
    }

  `]
})
export class IatecAudioWavePlayerComponent implements AfterViewInit {
  
  
  @Input() url: string = '';
  @Input() options?: WaveSurferOptions;
  @Input() showRate: boolean = false;
  @Input() speeds: number[] = [1,   1.5, 2];

  public uid: string = '';
  public waveSurfer: WaveSurfer | null = null;  
  public actualSpeed: number = 0;
  public isPlaying: boolean = false;

  public faPlayCircle  = faPlayCircle;
  public faPauseCircle = faPauseCircle;
  /**
   *
   */
  constructor() {
    this.uid = this.generateUUID();
    if (!this.options){
      this.options =  { container: "#player", barWidth: 2, barGap: 2, barRadius: 2, barHeight: 1, height:25, progressColor: '#0e4a75' };
    }

    this.actualSpeed = this.speeds[0];
  }

  ngAfterViewInit(): void {    
    this.load();
  }

  play(){
    this.waveSurfer?.play();
    this.isPlaying = true;
  }

  pause(){
    this.waveSurfer?.pause();
    this.isPlaying = false;
  }

  getTimeFormated() : string{
    let seconds = this.waveSurfer?.getCurrentTime() ?? 0;    
    let minutes = Math.floor(seconds/60);
    seconds = Math.round(seconds - (minutes * 60));      
    let min = minutes.toString();
    let sec = seconds.toString();
    return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  }

  speed(){
    let currentIndex = this.speeds.indexOf(this.actualSpeed);
    let speedLength = this.speeds.length-1;
    let choiceIndex = 0;
    if (currentIndex < speedLength){
      choiceIndex = currentIndex + 1;
    }
    this.actualSpeed = this.speeds[choiceIndex];
    this.waveSurfer?.setPlaybackRate(this.actualSpeed);
  }

  private load(){
    this.options!.container = `#${this.uid}`;
    this.waveSurfer = WaveSurfer.create({
      ...this.options!
    });
    this.waveSurfer.load(this.url).then(() => {
      this.waveSurfer?.on('finish', () => {
        this.waveSurfer?.stop();
        this.isPlaying = false;
        console.log('música acabou');
      });
    });
  }

  private generateUUID(): string {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    var firstPartx = ('000' + firstPart.toString(36)).slice(-3);
    var secondPartx = ('000' + secondPart.toString(36)).slice(-3);
    return 'ws' + firstPartx + secondPartx;
  }
}
