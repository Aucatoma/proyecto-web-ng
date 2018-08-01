import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpeechTextService} from '../service/speech-text.service';
declare var $: any;
declare var MediaRecorder: any;

@Component({
  selector: 'app-speech-text',
  templateUrl: './speech-text.component.html',
  styleUrls: ['./speech-text.component.css']
})
export class SpeechTextComponent implements OnInit, AfterViewInit {

  recordedAudio64;
  shouldStop = false;
  recording = false;
  fileReader = new FileReader();
  @Output() textoEmit = new EventEmitter<string>();

  constructor(
    private readonly _speechService: SpeechTextService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('[data-toggle="popover"]').popover({
      trigger: 'focus'
    });
  }

  clickMic() {
    if (this.recording === false) {
      return this.grabarAudio();
    } else {
      return this.pararAudio();
    }
  }

  grabarAudio() {
    console.log('Grabando');
    this.recording = true;
    const mediaPromise = navigator.mediaDevices.getUserMedia({audio: true, video: false});
    mediaPromise.then((stream) => {
      const options = {
        mimeType: 'audio/webm;codec=opus',
        audioBitsPerSecond: 16000
      };
      const recordedChunks = [];
      const mediaRecorder = new MediaRecorder(stream, options);
      let stopped = false;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
        if (!this.recording && stopped === false) {
          mediaRecorder.stop();
          stopped = true;
        }
      };

      mediaRecorder.onstop = () => {
        console.log(recordedChunks);
        this.fileReader.readAsDataURL(new Blob(recordedChunks));
        this.fileReader.onloadend = () => {
          const texto$ = this._speechService.obtenerTexto(this.fileReader.result.split(',')[1]);
          texto$.subscribe(
            value => {
              console.log(value.texto);
              this.textoEmit.emit(value.texto);
            },
            error1 => console.log(error1));
        };
      };

      mediaRecorder.start(500);
    });
  }

  pararAudio() {
    console.log('Audio parado');
    this.recording = false;
  }

}


