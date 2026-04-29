import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { IPrestacaoServico } from '../../../entities/prestacao-servico';
import { MatSelect, MatOption } from "@angular/material/select";
import { VendedorService } from '../../../services/vendedor/vendedor.service';
import { IVendedor } from '../../../entities/vendedor';

@Component({
  selector: 'app-vendedor-form',
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
    MatCardModule,
    MatSelect,
    MatOption
],
  templateUrl: './vendedor-form.component.html',
  styleUrl: './vendedor-form.component.scss'
})
export class VendedorFormComponent implements OnInit {

  form: FormGroup;
  isViewMode = false;
  isEditMode = false;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: VendedorService
    ) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.routeConfig?.path;
    this.isViewMode = url?.includes('view') || false;
    this.isEditMode = url?.includes('edit') || false;

    if (id) {
      this.loadById(+id);
    }
    if (this.isViewMode) {
      this.form.disable();
    }
  }
  
  salvar(): void {
    if (this.form.valid) {
      const vendedor: IVendedor = this.form.value;
      this.service.create(vendedor).subscribe({
        next: () => {
          this.voltar();
          this.snackBar.open('Salvo com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: () => {

          this.snackBar.open('Erro ao salvar, possivelmente já exista um vendedor com esse nome.', 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }

  update(): void {
    if (this.form.valid) {
      const vendedor: IVendedor = this.form.value;
      this.service.update(vendedor).subscribe({
        next: () => {
        this.voltar();
        this.snackBar.open('Alterado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        },
        error: () => {
        this.snackBar.open('Erro ao alterar', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        }
      });
    }
  }

  voltar(): void {
    this.form.reset();
    this.router.navigate(['/vendedor']);
  }

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      if (res.body) {
        this.form.patchValue(res.body);
      }
    });
  }

  formatarTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');

    valor = valor.substring(0, 15);

    this.form.get('telefone')?.setValue(valor, {
      emitEvent: false
    });
  }

}
