import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutService } from './logout.service';

// export function authHttpServiceFactory(auth: AuthService, http: HttpClient, options: RequestOptions) {
//   const config = new AuthConfig({
//     globalHeaders: [
//       { 'Content-Type': 'application/json' }
//     ]
//   });

//     return new MoneyHttp(auth, config, http, options);
// }

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
    providers: [
  //    {
  //     provide: AuthService,
  // //   useFactory: authHttpServiceFactory,
  // //   // deps: [AuthService, Http, RequestOptions]
  //  },

  LogoutService

  ]
})
export class SegurancaModule { }
