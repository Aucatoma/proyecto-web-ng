import {Component, DoCheck, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsuarioEdicion} from '../entidades/usuario-edicion';
import {Usuario} from '../entidades/usuario';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit, DoCheck {


  @Input() usuario: Usuario;
  @Output() usuarioEmit = new EventEmitter<UsuarioEdicion>();
  @HostBinding('attr.class') clase = 'col-sm-6';

  reader = new FileReader();
  usuarioForm: Usuario;

  constructor() {
    this.reader.onload = () => {
      this.usuario.imagenUrl = this.reader.result;
      console.log(this.usuario.imagenUrl);
    };

  }

  ngDoCheck(): void {
  }

  ngOnInit() {
    if (this.usuario === undefined){
      this.usuario =
        { id: 0,
          username: '',
          contrasenia: '',
          nombre: '',
          correo: '',
          apellido: '',
          imagenUrl: 'assets/images/img_no_usuario.png',
        };
    }
  }

  emitirUsuario(form) {
      const nombre = form.controls.nombre.value;
      const apellido = form.controls.apellido.value;
      const username = form.controls.username.value;
      const correo = form.controls.correo.value;
      const contrasenia = form.controls.contrasenia.value;

      const usuario: UsuarioEdicion = {
        nombre,
        apellido,
        username,
        correo,
        contrasenia,
        imagen: 'na',
        extension: ''
      };
    if (this.usuario.id !== 0) {
      usuario['id'] = this.usuario.id;
      console.log(usuario['id']);
      if (form.controls.imagen.dirty) {
        usuario.imagen = this.usuario.imagenUrl.split(',')[1];
        usuario.extension = this.usuario.imagenUrl.split(',')[0].split('/')[1].split(';')[0];
        this.usuarioEmit.emit(usuario);
      } else {
        usuario.extension = this.usuario.imagenUrl.split('.')[1];
        this.usuarioEmit.emit(usuario);
      }
    } else {
      usuario.imagen = this.usuario.imagenUrl.split(',')[1];
      usuario.extension = this.usuario.imagenUrl.split(',')[0].split('/')[1].split(';')[0];
      this.usuarioEmit.emit(usuario);
    }
  }

  cambiarFoto(imageInput) {
    if (imageInput.files[0]) {
      this.reader.readAsDataURL(imageInput.files[0]);
    }
  }

}
