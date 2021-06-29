import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { headers : this.getCustomHeaders() , withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      })
      .catch(erro => {
        console.log(erro);

      });
  }

  getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      // tslint:disable-next-line: max-line-length
      .set('Authorization', `Bearer ${this.auth.carregarToken()}`);
    return headers;
  }

}
