import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';


@Component({
  selector: 'app-confirm-action-modal',
  imports: [CommonModule],
  templateUrl: './confirm-action-modal.component.html',
  styleUrl: './confirm-action-modal.component.scss'
})
export class ConfirmActionModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmActionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private EventsService: EventsService
  ) {}

  ngOnInit(): void {}

   public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public confirmar_accion(){
    this.dialogRef.close({isDelete:true});
  }

}
