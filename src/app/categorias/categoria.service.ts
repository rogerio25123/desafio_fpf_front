import { AuthService } from './../seguranca/auth.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,

    ) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    return this.http.get(`${this.categoriasUrl}`,
    { headers : this.getCustomHeaders()  } )
      .toPromise()
      .then((response: any) => {
        // tslint:disable-next-line: no-unused-expression
        return response;
        // console.log(response);

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
