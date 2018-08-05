export class UsuarioTarjeta {
  id: number;
  usuario: number;
  tarjetaCredito: number;

  constructor (usuarioId: number, tarjetaId: number) {
    this.usuario = usuarioId;
    this.tarjetaCredito = tarjetaId;
  }
}
