import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';

    // Simulate an async login operation
    setTimeout(() => {
      this.loading = false;
      if (this.email === 'test@test.com' && this.password === '123456') {
        this.router.navigate(['/tabs']);
      } else {
        this.error = 'Invalid email or password';
      }
    }, 1000);
  }

  ngOnInit() {}
}
