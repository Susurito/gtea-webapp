import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { FooterComponent } from "../../../partials/footer/footer.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login-screen',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
