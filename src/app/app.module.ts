import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import br from '@angular/common/locales/br';
import { JwtModule } from '@auth0/angular-jwt';
import { ProdutosModule } from './produtos/produtos.module';

registerLocaleData(br, 'pt-BR');



export function tokenGetter() {
  console.log(localStorage.getItem('access_token'));
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    ProdutosModule,
    AppRoutingModule,
    SegurancaModule,


    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    }),

  ],
  providers: [

    {provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
