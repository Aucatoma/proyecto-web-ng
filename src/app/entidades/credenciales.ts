import {Usuario} from './usuario';
import {Jwt} from './jwt';

export interface Credenciales {
  usuario: Usuario;
  jwt: Jwt;
}
