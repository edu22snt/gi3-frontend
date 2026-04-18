import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';
  loading = false;
  error = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.loading = true;
      },
      error: (err) => {
        console.error('Login failed', err);
        this.error = true;
        // alert('Falha no login. Verifique suas credenciais e tente novamente.');
      }
    });
  }

}
