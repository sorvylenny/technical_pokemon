import { AuthService } from '@/app/core/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Register } from '@/app/core/interfaces/register/register';
import { HomePaths } from '@/app/core/utils/paths';
import { NgxNotifierService } from 'ngx-notifier';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private notifier: NgxNotifierService) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    address: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  async login() {
    try {
      const { email, password } = this.loginForm.value;

      const { user, token } = await this.authService.login({
        email: email ?? '',
        password: password ?? ''
      });

      this.loginForm.reset();


      if (user.role === 'admin') {
        this.router.navigate([`${HomePaths.ADMIN}/${HomePaths.DASHBOARD}`]);
      } else if (user.role === 'user') {
        this.router.navigate([HomePaths.ROOT]);
      }
      this.notifier.createToast('Bienvenido de nuevo' + ' ' + user.fullName, 'success', 5000)
    }
    catch (error) {

      this.notifier.createToast('Usuario / contraseña incorrecta', 'danger', 5000);

      throw error

    }
  }
  async register() {
    if (this.registerForm.valid) {
      const newUser: Register = {
        fullName: this.registerForm.value.fullName ?? '',
        email: this.registerForm.value.email ?? '',
        phone: this.registerForm.value.phone ?? '',
        address: this.registerForm.value.address ?? '',
        password: this.registerForm.value.password ?? ''
      };

      try {
        const { user } = await this.authService.register(newUser);
        this.registerForm.reset();
        this.router.navigate([HomePaths.ROOT]);
        this.notifier.createToast(`Usuario creado exitosamente ${user.fullName}`, 'success', 5000);
      } catch (error) {
        console.error('Error en el registro:', error);
        this.notifier.createToast('Error al crear el usuario', 'danger', 5000);
      }
    } else {
      console.error('Formulario inválido');
    }
  }

}
