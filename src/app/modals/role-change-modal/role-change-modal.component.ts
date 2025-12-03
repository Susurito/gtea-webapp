import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-change-modal',
  imports: [CommonModule],
  templateUrl: './role-change-modal.component.html',
  styleUrl: './role-change-modal.component.scss'
})
export class RoleChangeModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RoleChangeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}

  ngOnInit(): void {}

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public cambiarRol(){

  }

}
