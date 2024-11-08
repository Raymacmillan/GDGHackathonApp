import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() event: {title: string; date: Date | null; startTime: string; endTime: string } = {title: '', date : null, startTime: '', endTime: ''};
  @Output() deleteEvent = new EventEmitter<void>(); // Add this line

  // Emit the delete event when the X button is clicked
  onDeleteClick() {
    this.deleteEvent.emit();
  }
  ngOnChange() {
    console.log('Event recieved in Event Card:', this.event);
  }
}
