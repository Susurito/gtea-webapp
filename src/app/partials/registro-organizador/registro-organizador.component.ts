import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-organizador',
  imports: [],
  templateUrl: './registro-organizador.component.html',
  styleUrl: './registro-organizador.component.scss'
})
export class RegistroOrganizadorComponent implements OnInit {
  @Input() rol: string = "";
  @Input() datos_user: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
