import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {onErrorResumeNext, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  error = '';
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Ocurrio un error:`, error.error.message);
    } else {
      this.error = error.error.mensaje;
      return this.error;
    }
  }
}
