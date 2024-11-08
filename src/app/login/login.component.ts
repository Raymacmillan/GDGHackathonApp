import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Properties for login and registration
  email: string = '';
  password: string = '';
  newEmail: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  isRegisterMode: boolean = false; // Flag to toggle between login and registration

  constructor(private router: Router) {}

  // Function to handle login
  onLogin() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("Stored user:", user);

      // Hashing password before comparison (for example purposes)
      const hashedPassword = btoa(this.password); // Use a real hashing function in production
      if (user.email === this.email && user.password === hashedPassword) {
        // Navigate to the calendar route
        this.router.navigate(['/calendar']);
      } else {
        this.errorMessage = 'Invalid email or password.';
      }
    } else {
      this.errorMessage = 'No account found. Please create an account first.';
    }
  }

  // Function to handle registration
  onRegister(event: Event) {
    event.preventDefault();
    console.log('Registering with:', this.newEmail, this.newPassword);

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(this.newEmail)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Validate password length
    if (this.newPassword.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    if (this.newEmail && this.newPassword) {
      // Hash password before storing (for example purposes)
      const hashedPassword = btoa(this.newPassword); // Use a real hashing function in production
      const user = { email: this.newEmail, password: hashedPassword };
      localStorage.setItem('user', JSON.stringify(user));
      console.log("Registration successful");
      this.toggleMode(); // Switch to login form after registration
    } else {
      this.errorMessage = "Please fill in all fields.";
    }
  }

  // Function to toggle between login and registration forms
  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.clearFields();
  }

  // Helper function to clear form fields and error messages
  private clearFields() {
    this.email = '';
    this.password = '';
    this.newEmail = '';
    this.newPassword = '';
    this.errorMessage = '';
  }
}
