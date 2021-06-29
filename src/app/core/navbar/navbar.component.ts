import { AuthService } from './../../seguranca/auth.service';
import { ErrorHandlerService } from './../error-handler.service';
import { Router } from '@angular/router';
import { LogoutService } from './../../seguranca/logout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
        this.exibindoMenu = false;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
