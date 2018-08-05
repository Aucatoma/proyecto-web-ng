import { TestBed, inject } from '@angular/core/testing';

import { UsuarioTarjetaService } from './usuario-tarjeta.service';

describe('UsuarioTarjetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioTarjetaService]
    });
  });

  it('should be created', inject([UsuarioTarjetaService], (service: UsuarioTarjetaService) => {
    expect(service).toBeTruthy();
  }));
});
