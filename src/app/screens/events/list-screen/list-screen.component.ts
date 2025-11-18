import { Component } from '@angular/core';
import { NavbarComponent } from "../../../partials/navbar/navbar.component";
import { FooterComponent } from "../../../partials/footer/footer.component";

@Component({
  selector: 'app-list-screen',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './list-screen.component.html',
  styleUrl: './list-screen.component.scss'
})
export class ListScreenComponent {

}
