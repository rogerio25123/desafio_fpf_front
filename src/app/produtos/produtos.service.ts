import { Produto } from './../core/model';
import { environment } from './../../environments/environment';
import { AuthService } from './../seguranca/auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


export class ProdutoFiltro {
  descricao: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtosUrl: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    ) {
    this.produtosUrl = `${environment.apiUrl}/produtos`;
  }


  pesquisar(filtro: any): Promise<any> {
    const params = new HttpParams();
    const datePipe = new DatePipe('en-US');


    params.set('page', filtro.pagina.toString() );
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }



    return this.http.get(`${this.produtosUrl}?resumo`, { headers : this.getCustomHeaders(), params : this.getParams(filtro) })
      .toPromise()
      .then((response: any) => {

        const responseJson =  response;
        const produtos = response.content;

        const resultado = {
          produtos,
          total : responseJson.totalElements
        };

        // console.log(resultado.total);

        return resultado;

      });
  }


  excluir(codigo: number): Promise<void> {

    return this.http.delete(`${this.produtosUrl}/${codigo}`,
    { headers : this.getCustomHeaders()  })
      .toPromise()
      .then( () => null );

  }


  adicionar(produto: Produto): Promise<Produto> {

    return this.http.post(this.produtosUrl,
        JSON.stringify(produto), { headers : this.getCustomHeaders()  })
      .toPromise()
      .then((response: Produto) => {
        return response;
      });
  }

  atualizar(produto: Produto): Promise<Produto> {

    return this.http.put(`${this.produtosUrl}/${produto.codigo}`,
        JSON.stringify(produto), { headers : this.getCustomHeaders()  })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response as Produto;



        // this.converterStringsParaDatas([lancamentoAlterado]);


        return lancamentoAlterado;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Produto> {

    return this.http.get(`${this.produtosUrl}/${codigo}`, { headers : this.getCustomHeaders()  })
      .toPromise()
      .then(response => {
        const produto = response as Produto;

        // this.converterStringsParaDatas([lancamento]);
        // console.log(lancamento);

        return produto;
      });
  }


  getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      // tslint:disable-next-line: max-line-length
      .set('Authorization', `Bearer ${this.auth.carregarToken()}`);
    return headers;
  }

  getParams(filtro): HttpParams {
    let params = new HttpParams();
    const datePipe = new DatePipe('en-US');

    params = params.append('page', filtro.pagina);
    params = params.append('size', filtro.itensPorPagina);

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
      // console.log( filtro.descricao);
    }

    return params;
  }




}

