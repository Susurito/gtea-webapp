import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-estudiante',
  imports: [],
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.scss'
})
export class RegistroEstudianteComponent implements OnInit {


  @Input() rol: string = "";
  @Input() datos_user: any = {};

  constructor() { }

  ngOnInit(): void {

  }

}
