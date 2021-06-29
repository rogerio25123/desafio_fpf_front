import { ProdutosRoutingModule } from './produtos-routing.module';
import { SharedModule } from './../shared/shared.module';
import { MomentModule } from 'ngx-moment';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataViewModule } from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { ProdutosPesquisaComponent } from './produtos-pesquisa/produtos-pesquisa.component';
import { ProdutosCadastroComponent } from './produtos-cadastro/produtos-cadastro.component';



@NgModule({
  declarations: [
    ProdutosPesquisaComponent, ProdutosCadastroComponent
  ],
  imports: [
    InputTextModule,
    TableModule,
    CalendarModule,
    BrowserAnimationsModule,
    TooltipModule,
    DataViewModule,
    SelectButtonModule,
    CurrencyMaskModule,
    DropdownModule,
    InputMaskModule,
    FormsModule,
    MessageModule,
    MessagesModule,
    InputTextareaModule,
    MomentModule,
    SharedModule,
    ProdutosRoutingModule
  ]
})
export class ProdutosModule { }
