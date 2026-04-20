import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCurrencyDirective } from 'ngx-currency';
import { RepasseHsService } from '../../../services/repasse-hs/repasse-hs.service';
import { IRepasseHs } from '../../../entities/repasse-hs';

@Component({
  selector: 'app-repasse-hs-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatCardActions,
    NgxCurrencyDirective,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './repasse-hs-form.component.html',
  styleUrl: './repasse-hs-form.component.scss'
})
export class RepasseHsFormComponent implements OnInit {

    form: FormGroup;
    isViewMode = false;
    isEditMode = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: RepasseHsService
    ) {
    this.form = this.fb.group({
      id: [''],
      cliente: ['', Validators.required],
      contrato: ['', Validators.required],
      venda: ['', Validators.required],
      mes: ['', Validators.required],
      bem: ['', Validators.required],
      parcela: ['', Validators.required],
      valorBase: ['', Validators.required],
      comissaoGi3: ['', Validators.required],
      comissaoVendedor: ['', Validators.required],
      pg: ['', Validators.required],
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
      const repasseBancorbras: IRepasseHs = this.form.value;
      this.service.create(repasseBancorbras).subscribe({
        next: () => {
        this.voltar();
        this.snackBar.open('Salvo com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        },
        error: () => {
        this.snackBar.open('Erro ao salvar', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
        }
      });
    }
  }

  update(): void {
    if (this.form.valid) {
      const repasseBancorbras: IRepasseHs = this.form.value;
      this.service.update(repasseBancorbras).subscribe({
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
    this.router.navigate(['/repasse-hs']);
  }  

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      console.log('Dados carregados:', res);
      if (res.body) {
        const data = res.body;

        this.form.patchValue({
          ...data,
          venda: data.venda ? data.venda : null,
          mes: data.mes ? data.mes : null

        });
      }
    });
  }

  // parseDate(dateStr: string): Date {
  //   const [day, month, year] = dateStr.split('/');
  //   return new Date(+`20${year}`, +month - 1, +day);
  // }


}
