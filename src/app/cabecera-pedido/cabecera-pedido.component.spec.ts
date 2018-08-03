import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraPedidoComponent } from './cabecera-pedido.component';

describe('CabeceraPedidoComponent', () => {
  let component: CabeceraPedidoComponent;
  let fixture: ComponentFixture<CabeceraPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
