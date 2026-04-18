import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestacao-servico-form',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardActions,
    MatFormFieldModule,
    MatCardContent,
    MatCardTitle,
    MatCard,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule
],
  templateUrl: './prestacao-servico-form.component.html',
  styleUrl: './prestacao-servico-form.component.scss'
})
export class PrestacaoServicoFormComponent {

  form: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      vendedor: ['', Validators.required],
      contrato: ['', Validators.required],
      parcela: ['', Validators.required],
      valor: ['', Validators.required],
      empresa: ['', Validators.required]
    });
  }

  salvar() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  cancelar() {
    this.form.reset();
    this.router.navigate(['/prestacao-servico']);
  }

}
