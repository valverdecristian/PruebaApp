import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SupabaseService } from '../services/supabase';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
  ],
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  error = '';

  constructor(
    private router: Router,
    private supabase: SupabaseService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async login() {
    this.error = '';
    const loading = await this.loadingController.create({
      message: 'verificando credenciales...',
      spinner: 'crescent',
      cssClass: 'custom-loading',
    });

    await loading.present();

    const { data, error } = await this.supabase.login(
      this.email,
      this.password
    );

    await loading.dismiss();

    if (error) {
      this.showToast(error.message, 'danger');
    } else {
      this.showToast('Inicio de sesión exitoso', 'success');
      this.router.navigate(['/tabs']);
    }
  }

  ngOnInit() {}

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position: 'bottom',
      color,
    });

    await toast.present();
  }
}
