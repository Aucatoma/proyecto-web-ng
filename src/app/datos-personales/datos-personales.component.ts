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

  imagenUsuario = 'assets/images/img_no_usuario.png';
  reader = new FileReader();
  usuarioForm: Usuario;

  constructor() {
    this.reader.onload = () => {
      this.imagenUsuario = this.reader.result;
      console.log(this.imagenUsuario);
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
      console.log(form);
      /*
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

      console.log(form);
      //this.usuarioEmit.emit(usuario);
    */
    }

    cambiarFoto(imageInput) {
      if (imageInput.files[0]) {
        this.reader.readAsDataURL(imageInput.files[0]);
      }
    }

  }
