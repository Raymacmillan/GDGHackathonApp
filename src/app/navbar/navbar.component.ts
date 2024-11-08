import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
isMenuOpen: boolean = false;


toggleMenu() {
  console.log('Toggling menu'); // Debugging line
  this.isMenuOpen = !this.isMenuOpen;
}

closeMenu() {
  console.log('Closing menu'); // Debugging line
  this.isMenuOpen = false;
}

}
