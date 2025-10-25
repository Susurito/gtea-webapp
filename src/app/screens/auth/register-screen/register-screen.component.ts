import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../partials/footer/footer.component";
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register-screen',
  imports: [FooterComponent, NavbarComponent, RouterLink],
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.scss'
})
export class RegisterScreenComponent implements OnInit{
  constructor() { }
  ngOnInit(): void {

  }

}
