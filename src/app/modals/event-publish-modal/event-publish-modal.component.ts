import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-event-publish-modal',
  imports: [CommonModule],
  templateUrl: './event-publish-modal.component.html',
  styleUrl: './event-publish-modal.component.scss'
})
export class EventPublishModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EventPublishModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private eventsService: EventsService
  ) {}
  ngOnInit(): void {}

   public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }


  ///CHECAAAAAR

  public publicarEvento(){
    this.eventsService.publishEvent(this.data.eventId).subscribe({
      next: (response) => {
        this.dialogRef.close({isDelete:true});
      },
      error: (error) => {
        console.error('Error publishing event:', error);
      }
    });

}

}
