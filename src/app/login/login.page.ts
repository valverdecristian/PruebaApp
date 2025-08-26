import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SupabaseService } from '../services/supabase';

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

  constructor(private router: Router, private supabase: SupabaseService) {}

  async login() {
    this.loading = true;
    this.error = '';

    const { data, error } = await this.supabase.login(
      this.email,
      this.password
    );

    this.loading = false;

    if (error) {
      this.error = error.message;
    } else {
      this.router.navigate(['/tabs']);
    }
  }

  ngOnInit() {}
}
