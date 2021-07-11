import { AuthService } from './../../seguranca/auth.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { ProdutoFiltro } from './../produtos.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos-pesquisa',
  templateUrl: './produtos-pesquisa.component.html',
  styleUrls: ['./produtos-pesquisa.component.css']
})
export class ProdutosPesquisaComponent implements OnInit {


  totalRegistro = 0;
  filtro = new ProdutoFiltro();
  produtos = [];

  @ViewChild('tabela', { static: true }) grid;


  constructor(
    private produtoService: ProdutosService,
    private errorHandle: ErrorHandlerService,
    private title: Title,
    public auth: AuthService
  ) { }

  ngOnInit() {

    this.title.setTitle('Pesquisa de produtos');
    // this.pesquisar();
  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.produtoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistro = resultado.total;
        this.produtos = resultado.produtos;
      }).catch(
        erro => this.errorHandle.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    // console.log(event);
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);

  }



  excluir(lancamento: any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-xs',
        cancelButton: 'btn btn-danger btn-xs'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Não, cancele!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.produtoService.excluir(lancamento.codigo)
          .then(() => {
            if (this.grid.first === 0) {
              console.log('estou na primeira pagina');
              this.pesquisar();
            } else {
              console.log('estou >= 2');
              this.grid.first = 0;
              this.pesquisar();
            }

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro Excluído com sucesso!',
              showConfirmButton: false,
              timer: 1500
            });


          }).catch(
            erro => this.errorHandle.handle(erro)
          );
        // swalWithBootstrapButtons.fire(
        //   'Excluído!',
        //   'Seu registro foi excluído.',
        //   'success'
        // );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        // swalWithBootstrapButtons.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    });



  }

}
