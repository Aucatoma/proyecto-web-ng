import { TestBed, inject } from '@angular/core/testing';

import { TarjetaCreditoService } from './tarjeta-credito.service';

describe('TarjetaCreditoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarjetaCreditoService]
    });
  });

  it('should be created', inject([TarjetaCreditoService], (service: TarjetaCreditoService) => {
    expect(service).toBeTruthy();
  }));
});
