import { EnrollmentsService } from './../../services/enrollments.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollment-cancel-modal',
  imports: [CommonModule],
  templateUrl: './enrollment-cancel-modal.component.html',
  styleUrl: './enrollment-cancel-modal.component.scss'
})
export class EnrollmentCancelModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EnrollmentCancelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private enrollmentsService: EnrollmentsService
  ) {}

  ngOnInit(): void {}

   public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarInscripcion() {
    this.enrollmentsService.eliminarInscripcion(this.data.id).subscribe(
      (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      }, (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    );
  }

}
