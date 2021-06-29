
import { Routes, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


import { environment } from './../../environments/environment';
import { Route } from '@angular/compiler/src/core';




@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  exibindoMenu = false;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    // this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {
    const body = `username=${usuario}&password=${senha}&grant_type=password`;


    return this.http.post(this.oauthTokenUrl, body,
        { headers: this.getCustomHeadersToken() , withCredentials: false })
      .toPromise()
      .then((response: any ) => {
        // console.log(response.access_token);
        this.armazenarToken(response.access_token);
      })
      .catch(response => {
        if (response.status === 400) {
          // const responseJson = response.json();

          if (response.error.error === 'invalid_grant') {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Usuário ou senha inválida!',
              showConfirmButton: false,
              timer: 1500
            });
            return Promise.reject('Usuário ou senha inválida!');
          }
        }

        return Promise.reject(response);
      });
  }

  getCustomHeadersToken(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      // tslint:disable-next-line: max-line-length
      .set('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    return headers;
  }

  obterNovoAccessToken(): Promise<void> {

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers: this.getCustomHeadersToken(), withCredentials: false })
      .toPromise()
      .then((response: any) => {
        this.armazenarToken(response.access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }

    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken()  {
    const token = localStorage.getItem('token');

    if (this.isAccessTokenInvalido()) {
     // throw new NotAuthenticatedError();
      this.router.navigate(['/login']);
      this.exibindoMenu = false;
      console.log('token inválido');
    }


    console.log('metodo carregar token');
    if (token) {
      this.armazenarToken(token);
      return token;
    }
  }

}
