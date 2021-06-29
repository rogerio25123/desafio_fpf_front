import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {
    path: 'produtos',
    component: ProdutosPesquisaComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'produtos/novo',
    component: ProdutosCadastroComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'produtos/:codigo',
    component: ProdutosCadastroComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
