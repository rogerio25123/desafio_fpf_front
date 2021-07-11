import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Produto } from './../../core/model';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produtos-cadastro',
  templateUrl: './produtos-cadastro.component.html',
  styleUrls: ['./produtos-cadastro.component.css']
})
export class ProdutosCadastroComponent implements OnInit {


  categorias = [];
  produto = new Produto();




  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutosService,
    private errorHandle: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
  ) { }

  ngOnInit() {


    // tslint:disable-next-line:no-string-literal
    const codigoProduto = this.route.snapshot.params['codigo'];


    this.title.setTitle('Novo lançamento');

    if (codigoProduto) {
      this.carregarLancamento(codigoProduto);
    }
    this.carregarCategorias();
  }


  get editando() {
    return Boolean(this.produto.codigo);
  }

  carregarLancamento(codigo: number) {
    const datePipe = new DatePipe('en-US');
    this.produtoService.buscarPorCodigo(codigo)
      .then((produto) => {

        this.produto = produto;
        console.log(this.produto);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  salvar(form) {
    // console.log(this.lancamento);
    if (this.editando) {
      console.log(form);
      this.atualizarProduto(form);

    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produtoAdicionado => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Produto adicionado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });


        console.log(produtoAdicionado);
        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/produtos', produtoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
          .map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => {
        this.errorHandle.handle(erro);
        console.log(erro);

      });
  }


  atualizarProduto(form: FormControl) {
    const datePipe = new DatePipe('en-US');

    this.produtoService.atualizar(this.produto)
      .then(produto => {
        this.produto = produto;

        console.log('--------');
        console.log(this.produto);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Produto alterado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });

        this.atualizarTituloEdicao();
      })
      .catch(erro => {
        console.log(erro);
        this.errorHandle.handle(erro);
      });
  }

  novo(form) {
    form.reset();
    setTimeout(function() {
        this.produto = new Produto();
    }.bind(this), 1);
    this.router.navigate(['/produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de : ${this.produto.descricao}`);
  }



}

