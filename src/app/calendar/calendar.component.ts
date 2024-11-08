import { FormsModule } from '@angular/forms';
import { EventCardComponent } from "../event-card/event-card.component";
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, EventCardComponent, CommonModule],
  template: `
  <!-- Large Screens -->
<div *ngIf="isEventsVisible && isLargeScreen" class="flex items-center justify-center">
  <!-- Left section for even-indexed events -->
  <div class="absolute top-0 left-0 bg-gradient-to-r from-slate-900 via-black to-gray-900 text-gray-100 p-2 rounded-br-sm" style="width: 30%">
    <h1 class="text-center font-bold text-lg mb-4">UPCOMING EVENTS</h1>
    <ng-container *ngFor="let event of evenEvents">
      <app-event-card 
        [event]="event" 
        (deleteEvent)="deleteEvent(event.id)"
        class="bg-slate-800 text-gray-100 rounded-md shadow-md mb-4"
      ></app-event-card>
    </ng-container>
    <p *ngIf="evenEvents.length === 0" class="text-center text-gray-300">No events yet. Add an event to see it here.</p>
  </div>

  <!-- Right section for odd-indexed events -->
  <div class="absolute top-0 right-0 bg-gradient-to-r from-slate-900 via-black to-gray-900 text-gray-100 p-2 rounded-bl-sm" style="width: 30%">
    <h1 class="text-center font-bold text-lg mb-4">UPCOMING EVENTS</h1>
    <ng-container *ngFor="let event of oddEvents">
      <app-event-card 
        [event]="event" 
        (deleteEvent)="deleteEvent(event.id)"
        class="bg-slate-800 text-gray-100 rounded-md shadow-md mb-4"
      ></app-event-card>
    </ng-container>
    <p *ngIf="oddEvents.length === 0" class="text-center text-gray-300">No events yet. Add an event to see it here.</p>
  </div>
</div>

<!-- Medium Screens -->
<div *ngIf="isEventsVisible && isMediumScreen && !isLargeScreen" class="absolute top-0 right-0 bg-gradient-to-r from-slate-900 via-black to-gray-900 text-gray-100 p-2 rounded-bl-sm" style="width: 40%">
  <h1 class="text-center font-bold text-lg mb-4">UPCOMING EVENTS</h1>
  <ng-container *ngFor="let event of events">
    <app-event-card 
      [event]="event" 
      (deleteEvent)="deleteEvent(event.id)"
      class="bg-slate-800 text-gray-100 rounded-md shadow-md mb-4"
    ></app-event-card>
  </ng-container>
  <p *ngIf="events.length === 0" class="text-center text-gray-300">No events yet. Add an event to see it here.</p>
</div>

<!-- Event Input Form and Main Content -->
<div class="flex items-center justify-center gap-4 mt-10 w-full flex-col h-full">
  <div class="flex-col items-start w-80" style="margin-top: 10%;">
    <!-- Event Input Fields -->
    <div class="flex items-center justify-center mb-4">
      <input 
        class="outline-none border-2 border-gray-200 p-2 rounded-l w-3/4 h-8"
        type="text"
        [(ngModel)]="eventTitle"
        placeholder="Enter event title"
      />
      <button 
        (click)="onAddEvent()" 
        class="bg-black rounded-r text-white text-sm p-2 hover:bg-gray-900 transition-all ease-out duration-300 h-8 w-1/4">
        Add
      </button>
    </div>
    <div class="shadow-md p-8 bg-gray-100 rounded-md">
      <input 
        class="outline-none bg-gray-200 rounded-sm p-2 mb-4 w-full"
        type="date"
        [(ngModel)]="eventDate"
        placeholder="Select a date"
      />
      <input 
        class="outline-none w-full bg-gray-200 rounded-sm p-2 mb-4"
        type="time"
        [(ngModel)]="startTime"
        placeholder="Start Time"
      />
      <input 
        class="outline-none w-full bg-gray-200 rounded-sm p-2 mb-4"
        type="time"
        [(ngModel)]="endTime"
        placeholder="End Time"
      />
      <div class="mt-4">
        <label for="reminderMinutes" class="block mb-2">Set Reminder (in minutes):</label>
        <input 
          type="number" 
          id="reminderMinutes" 
          [(ngModel)]="reminderMinutes" 
          class="outline-none bg-gray-200 rounded-sm p-2 w-full" 
          placeholder="Enter minutes before event" 
        />
      </div>
      <button 
  (click)="toggleReminder()" 
  class="w-full flex items-center justify-center mt-2 outline-none bg-blue-500 transition ease-in-out duration-300 hover:bg-blue-900 text-white rounded-md p-2">
  <svg *ngIf="!isReminderSet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <!-- SVG for the first bell icon -->
    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM20.57 16.476c-.223.082-.448.161-.674.238L7.319 4.137A6.75 6.75 0 0 1 18.75 9v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206Z" />
    <path fill-rule="evenodd" d="M5.25 9c0-.184.007-.366.022-.546l10.384 10.384a3.751 3.751 0 0 1-7.396-1.119 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clip-rule="evenodd" />
  </svg>
  <svg *ngIf="isReminderSet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
    <!-- SVG for the second bell icon -->
    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
    <path fill-rule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 1 4.832-1.244.75.75 0 0 0 .297-1.206A8.217 8.217 0 0 1 18.75 9V9a6.75 6.75 0 0 0-6.75-6.75Z" clip-rule="evenodd" />
  </svg>
</button>
    </div>
  </div>

  <!-- Upcoming Events Section -->
  <div *ngIf="isEventsVisible && !isMediumScreen && !isLargeScreen" class="w-full flex flex-col mt-10">
    <h1 class="text-center font-bold text-lg mb-4">UPCOMING EVENTS</h1>
    <ng-container *ngFor="let event of events">
      <app-event-card 
        [event]="event" 
        (deleteEvent)="deleteEvent(event.id)"
        class="bg-slate-800 text-gray-100 rounded-md shadow-md mb-4 w-full"
      ></app-event-card>
    </ng-container>
    <p *ngIf="events.length === 0" class="text-center text-gray-300">No events yet. Add an event to see it here.</p>
  </div>
  
<button 
(click)="toggleEventVisiblility()" 
class="fixed bg-gray-400 text-white p-2 rounded-full mb-4 hover:bg-black transition ease-in-out duration 300 transition-transform" style="top: 50vh; left: 80vw">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
</svg>
</button>

</div>
  `,
  styleUrls: ['./calendar.component.css']
})


export class CalendarComponent implements OnInit {
  eventTitle: string = '';
  eventDate: Date | null = null;
  startTime: string = '';
  endTime: string = '';
  events: { id: number; title: string; date: Date | null; startTime: string; endTime: string; reminderMinutes: number }[] = [];
  isLargeScreen: boolean = false;
  isMediumScreen: boolean = false;
  isReminderSet: boolean = false;
  isEventsVisible: boolean = false;
  private intervalId: any;

  reminderMinutes: number = 10; // Default reminder 10 minutes before event

  constructor(private cdr: ChangeDetectorRef) {
    this.loadEventsFromStorage();
  }

  toggleReminder() {
    this.isReminderSet = !this.isReminderSet;  // Toggle the reminder state
    if (this.isReminderSet) {
      // Schedule reminders only if the reminder time is valid
      this.events.forEach(event => {
        if (this.isValidReminder(event)) {
          this.scheduleReminder(event);
        } else {
          console.warn(`Reminder time for ${event.title} is after the event's start time.`);
        }
      });
    }
    this.setReminder();  // Optional: perform any additional actions
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    this.isLargeScreen = width >= 1024;
    this.isMediumScreen = width >= 768 && width < 1200;
  }

  isValidReminder(event: any): boolean {
    const eventStartTime = new Date(`${event.date}T${event.startTime}`).getTime();
    const reminderTime = eventStartTime - this.reminderMinutes * 60000;
    return reminderTime > Date.now(); // Ensure reminder is set for a future time before the event starts
  }

  get evenEvents() {
    return this.events.filter((_, i) => i % 2 === 0);
  }

  get oddEvents() {
    return this.events.filter((_, i) => i % 2 !== 0);
  }

  deleteEvent(eventId: number) {
    // Update the events array inside the Angular zone
    this.events = this.events.filter(event => event.id !== eventId);
    this.saveToLocalStorage();
  }

  ngOnInit(): void {
    this.isEventsVisible = false; // Ensure initialization
    this.requestNotificationPermission();
    this.checkScreenSize();
    this.cdr.detectChanges();

    this.intervalId = setInterval(() => {
      console.log('Checking and deleting expired events');
      this.checkAndDeleteExpiredEvents();
    }, 60000); // Check every minute
  }



  toggleEventVisiblility() {
    this.isEventsVisible = !this.isEventsVisible;
  }

  // Check for expired events and schedule their deletion
  checkAndDeleteExpiredEvents() {
    const now = new Date();

    this.events.forEach(event => {
      // Ensure event.date is a Date object and event.startTime is valid
      if (event.date && event.startTime) {
        const eventDateTime = new Date(event.date as Date);
        const [hours, minutes] = event.startTime.split(':').map(Number);

        // Ensure the time is valid before setting it
        if (!isNaN(hours) && !isNaN(minutes)) {
          eventDateTime.setHours(hours, minutes);

          // If the event is in the past, schedule it for deletion after 5 minutes
          if (eventDateTime < now) {
            const fiveMinutesAfter = new Date(eventDateTime.getTime() + 5 * 60000);
            if (fiveMinutesAfter <= now) {
              this.deleteEvent(event.id);  // This will update the events array and trigger change detection
            }
          }
        }
      }
    });
  }

  loadEventsFromStorage() {
    const storedEvents = localStorage.getItem('events');
    try {
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents)
          .map((event: any) => ({
            ...event,
            date: event.date ? new Date(event.date) : null,
          }))
          .filter((event: any) => event.id && event.title && event.date && event.startTime && event.endTime);
        console.log('Load Events', parsedEvents);
        this.events = parsedEvents; // Populate events
      } else {
        this.events = [];
      }
    } catch (error) {
      console.error('Failed to load events from storage', error);
      this.events = []; // Fallback to an empty array
    }
  }


  onAddEvent() {
    if (!this.eventTitle || !this.eventDate || !this.startTime || !this.endTime) {
      alert("All fields must be filled to add an event.");
      return;
    }

    if (!this.isFutureEvent(this.eventDate, this.startTime)) {
      alert('Please select a future date and time.');
      return;
    }

    const start = this.getDateTime(this.eventDate, this.startTime);
    const end = this.getDateTime(this.eventDate, this.endTime);

    if (end <= start) {
      alert('End time must be after the start time.');
      return;
    }

    const newEvent = {
      id: Date.now(),  // Generate a unique ID based on the current timestamp
      title: this.eventTitle,
      date: this.eventDate,
      startTime: this.startTime,
      endTime: this.endTime,
      reminderMinutes: this.reminderMinutes,
    };
    this.events.push(newEvent);

    this.saveToLocalStorage();
    this.clearForm();
    this.scheduleReminder(newEvent); // Schedule reminder for this event
  }

  getDateTime(date: Date | null, time: string): Date {
    const dateTime = new Date(date as Date);
    const [hours, minutes] = time.split(':').map(Number);
    dateTime.setHours(hours, minutes);
    return dateTime;
  }

  isFutureEvent(eventDate: Date | null, startTime: string): boolean {
    if (!eventDate || !startTime) return false;

    const selectedDate = new Date(eventDate);
    const [hours, minutes] = startTime.split(':').map(Number);
    selectedDate.setHours(hours, minutes);

    return selectedDate > new Date();
  }

  clearForm() {
    this.eventTitle = '';
    this.eventDate = null;
    this.startTime = '';
    this.endTime = '';
    this.reminderMinutes = 10; // Reset reminder
  }

  saveToLocalStorage() {
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  // Request notification permission from the user
  requestNotificationPermission() {
    if ('Notification' in window) { // Check if the browser supports notifications
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        } else if (permission === 'denied') {
          console.log('Notification permission denied');
        } else {
          console.log('Notification permission not requested');
        }
      }).catch(error => {
        console.error('Error requesting notification permission:', error);
      });
    } else {
      console.log('Notifications are not supported in this browser');
    }
  }

  scheduleReminder(event: any) {
    const eventTime = new Date(event.startTime).getTime();
    const reminderTime = this.reminderMinutes * 60 * 1000; // Convert reminder minutes to milliseconds
    const now = Date.now();
  
    // Only schedule if reminder time is less than the event start time
    if (eventTime - now > reminderTime) {
      const reminderTimestamp = eventTime - reminderTime;
      if (reminderTimestamp > now) {
        // Schedule the reminder
        setTimeout(() => {
          alert(`Reminder: Event "${event.title}" is starting soon!`);
        }, reminderTimestamp - now);
      }
    } else {
      alert("Reminder time must be set to a period earlier than the event start time.");
    }
  }


  showReminderNotification(event: any) {
    if (Notification.permission === 'granted') {
      new Notification(`Reminder: ${event.title}`, {
        body: `Event starts at ${event.startTime}`,
        requireInteraction: true,
      });
    }
  }

  setReminder() {
    console.log(`Reminder set for ${this.reminderMinutes} minutes before the event.`);
  }
}

