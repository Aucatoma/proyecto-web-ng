import { TestBed, inject } from '@angular/core/testing';

import { CredencialesService } from './credenciales.service';

describe('CredencialesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CredencialesService]
    });
  });

  it('should be created', inject([CredencialesService], (service: CredencialesService) => {
    expect(service).toBeTruthy();
  }));
});
