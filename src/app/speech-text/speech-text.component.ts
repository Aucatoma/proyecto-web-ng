import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-speech-text',
  templateUrl: './speech-text.component.html',
  styleUrls: ['./speech-text.component.css']
})
export class SpeechTextComponent implements OnInit, AfterViewInit {

  recordedAudio = [];
  recording = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('[data-toggle="popover"]').popover({
      trigger: 'focus'
    });
  }

  grabarAudio() {
    console.log('Grabando');
    //this.recording = true;
    //navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(this.handleSuccess);
    $('#img_mic').unbind('click', this.grabarAudio);
    $('#img_mic').bind('click', this.pararAudio);
  }

  pararAudio() {
    console.log('Audio parado');
    $('#img_mic').unbind('click', this.pararAudio);
    $('#img_mic').bind('click', this.grabarAudio);
  }

  handleSuccess(stream) {
    const options = {
      mimeType: 'audio/webm;codec=opus',
      audioBitsPerSecond: 16000
    };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      this.recordedAudio = recordedChunks;
      console.log(this.recordedAudio);
    };
    mediaRecorder.start(500);
  }
}
