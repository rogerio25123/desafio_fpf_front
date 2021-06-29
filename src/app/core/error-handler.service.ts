import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable()
export class ErrorHandlerService {

  constructor(
    // private toasty: ToastyService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

     // console.log(errorResponse);

      // } else if (errorResponse instanceof NotAuthenticatedError) {
      //   msg = 'Sua sessão expirou!';
      //   this.router.navigate(['/login']);

    } else if (errorResponse instanceof Response
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar esta ação';
      }

      try {
        errors = errorResponse;

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      // console.error('Ocorreu um erro', errorResponse);
    }

    // this.toasty.error(msg);
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: msg,
      showConfirmButton: false,
      timer: 2500
    });

  }

}
