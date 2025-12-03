import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';


@Component({
  selector: 'app-confirm-delete-modal',
  imports: [CommonModule],
  templateUrl: './confirm-delete-modal.component.html',
  styleUrl: './confirm-delete-modal.component.scss'
})
export class ConfirmDeleteModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private EventsService: EventsService
  ) {}
  ngOnInit(): void {}

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarEvento() {
    this.EventsService.eliminarEvento(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }

}
