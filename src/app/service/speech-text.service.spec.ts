import { TestBed, inject } from '@angular/core/testing';

import { SpeechTextService } from './speech-text.service';

describe('SpeechTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechTextService]
    });
  });

  it('should be created', inject([SpeechTextService], (service: SpeechTextService) => {
    expect(service).toBeTruthy();
  }));
});
