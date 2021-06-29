import { ProdutosService } from './../produtos/produtos.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LogoutService } from './../seguranca/logout.service';
import { AuthService } from './../seguranca/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Title } from '@angular/platform-browser';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { RouterModule } from '@angular/router';
import { CategoriaService } from './../categorias/categoria.service';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';

import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    NavbarComponent, PaginaNaoEncontradaComponent ,  NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,


    TableModule,
    CalendarModule,
    TooltipModule,
    DataViewModule,
    SelectButtonModule,
    CurrencyMaskModule,
    DropdownModule,
    InputMaskModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    SweetAlert2Module.forRoot(),

  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    CategoriaService,
    ProdutosService,
    InputTextModule,

    ErrorHandlerService,
    Title,
    AuthService,
    LogoutService,
    JwtHelperService,




  ]
})
export class CoreModule { }
