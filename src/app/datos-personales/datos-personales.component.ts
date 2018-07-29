import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {UsuarioEdicion} from '../entidades/usuario-edicion';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {


  @HostBinding('attr.class') clase = 'col-sm-6';
  @Output() usuarioEmit = new EventEmitter<UsuarioEdicion>();

  imagenUsuario = 'assets/images/img_no_usuario.png';
  reader = new FileReader();

  constructor() {
    this.reader.onload = () => {
      this.imagenUsuario = this.reader.result;
      console.log(this.imagenUsuario);
    };
  }

  ngOnInit() {
  }

  emitirUsuario(form) {
    const nombre = form.controls.nombre.value;
    const apellido = form.controls.apellido.value;
    const username = form.controls.username.value;
    const correo = form.controls.correo.value;
    const contrasenia = form.controls.contrasenia.value;
    const imagen = this.imagenUsuario.split(',')[1];
    const extension = this.imagenUsuario.split(',')[0].split('/')[1].split(';')[0];

    const usuario: UsuarioEdicion = {
      nombre,
      apellido,
      username,
      correo,
      contrasenia,
      imagen,
      extension,
    };

    this.usuarioEmit.emit(usuario);
  }

  cambiarFoto(imageInput) {
    if (imageInput.files[0]) {
      this.reader.readAsDataURL(imageInput.files[0]);
    }
  }

}
