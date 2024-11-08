import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var OneSignal: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarComponent, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title =  'Timely';
  eventTitle: string = '';
  eventDate: Date | null = null;
  startTime: string = '';
  endTime: string = '';

  constructor(private router: Router) {}
  showNavbar(): boolean {
    console.log('Current route: ', this.router.url);
    return this.router.url !== '/login';
  }

  ngOnInit() {
    this.requestNotificationPermission();
    this.scheduleReminders();

    this.initializeOneSignal();
  }

  initializeOneSignal() {
    OneSignal.init({
      appId: '40400bae-ca11-474d-8ccd-a4ed44966b33',
      notifyButton: {
        enable: true,
      },
    });

    OneSignal.showSlidedownPrompt();
  }



  // Request Notification Permission
  async requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  }

  // Add Reminder to localStorage
  addReminder() {
    if (!this.eventTitle || !this.eventDate || !this.startTime || !this.endTime) {
      alert("All fields must be filled to add an event.");
      return;
    }

    const reminder = {
      title: this.eventTitle,
      time: this.getDateTime(this.eventDate, this.startTime),
      notified: false
    };

    // Retrieve existing reminders from localStorage
    let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    reminders.push(reminder);

    // Save updated reminders back to localStorage
    localStorage.setItem('reminders', JSON.stringify(reminders));

    console.log('Reminder Added:', reminder);

    this.clearForm();
    this.scheduleReminders();
  }

  // Convert Date and Time to a Date object
  getDateTime(date: Date | null, time: string): Date {
    const selectedDate = new Date(date!);
    const [hours, minutes] = time.split(':').map(Number);
    selectedDate.setHours(hours, minutes);
    return selectedDate;
  }

  // Schedule Reminders
  scheduleReminders() {
    // Retrieve reminders from localStorage
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    
    reminders.forEach((reminder: any) => {
      const timeToNotify = new Date(reminder.time).getTime() - Date.now();
      
      if (timeToNotify > 0 && !reminder.notified) {
        setTimeout(async () => {
          this.showNotification(reminder.title);
          await this.markAsNotified(reminder);
        }, timeToNotify);
      }
    });
  }

  // Show Notification
  showNotification(title: string) {
    new Notification('Reminder', {
      body: `Event: ${title}`,
      icon: 'assets/icons/icon-192x192.png'
    });
  }

  // Mark Reminder as Notified in localStorage
  markAsNotified(reminder: any) {
    let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const updatedReminders = reminders.map((r: any) => {
      if (r.title === reminder.title && r.time === reminder.time) {
        r.notified = true;
      }
      return r;
    });

    // Save updated reminders back to localStorage
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  }

  // Clear the form fields
  clearForm() {
    this.eventTitle = '';
    this.eventDate = null;
    this.startTime = '';
    this.endTime = '';
  }
}
