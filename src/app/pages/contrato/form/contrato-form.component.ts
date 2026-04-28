import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardActions, MatCardContent, MatCardTitle, MatCard, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelect, MatOption } from "@angular/material/select";
import { NgxCurrencyDirective } from 'ngx-currency';
import { ContratoService } from '../../../services/contrato/contrato.service';
import { IContrato } from '../../../entities/contrato';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IContratoParcela } from '../../../entities/contrato-parcelas';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-contrato-form',
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
    MatOption,
    NgxCurrencyDirective,
    MatTableModule,
    MatPaginator,
    MatFormField,
    MatLabel,
    FormsModule
],
  templateUrl: './contrato-form.component.html',
  styleUrl: './contrato-form.component.scss'
})
export class ContratoFormComponent implements OnInit {

  form: FormGroup;
  isViewMode = false;
  isEditMode = false;

  dataSource = new MatTableDataSource<IContratoParcela>();
  idContrato: string = "";

  displayedColumns: string[] = [
    'numeroParcela',
    'porcentagemComissao',
    'base',
    'comissao',
    'liquido',
    'status'
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: ContratoService
    ) {
    this.form = this.fb.group({
      id: [''],
      numeroContrato: ['', Validators.required],
      vendedor: ['', Validators.required],
      tipo: ['', Validators.required],
      empresa: ['', Validators.required],
      qntParcelas: ['', Validators.required],
      valor: ['', Validators.required],
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
      const contrato: IContrato = this.form.value;
      contrato.parcelas = [];

      for (let i = 1; i <= contrato.qntParcelas; i++) {
        const contratoParcela: IContratoParcela = {
          numeroParcela: String(i),
          status: 'PENDENTE'
        };
        contrato.parcelas.push(contratoParcela);
      }

      this.service.create(contrato).subscribe({
        next: () => {
        this.voltar();
        // this.salvarParcelas(contrato);
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

  // salvarParcelas(contrato: IContrato): void {
  //   for (let i = 1; i <= contrato.qntParcelas; i++) {
  //     const contratoParcela: IContratoParcela = {
  //       numeroParcela: String(i),
  //       numeroContrato: String(contrato.numeroContrato),
  //       status: 'PENDENTE'
  //     };

  //     this.serviceParcela.create(contratoParcela).subscribe({
  //       next: () => {
  //         this.snackBar.open('Salvo com sucesso!', 'Fechar', {
  //           duration: 3000,
  //           horizontalPosition: 'right',
  //           verticalPosition: 'top'
  //         });
  //       },
  //       error: () => {
  //         this.snackBar.open('Erro ao salvar', 'Fechar', {
  //           duration: 3000,
  //           panelClass: ['snackbar-error']
  //         });
  //       }
  //     });
  //   }
  // }

  update(): void {
    if (this.form.valid) {
      const contrato: IContrato = this.form.value;
      this.service.update(contrato).subscribe({
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
    this.router.navigate(['/contrato']);
  }

  loadById(id: number): void {
    this.service.find(id).subscribe(res => {
      console.log('Dados carregados:', res);
      if (res.body) {
        this.idContrato = res.body.numeroContrato;
        this.form.patchValue(res.body);
        this.loadData();
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  loadData(): void {
    this.service.searchByKeyword(this.idContrato, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IContratoParcela[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  protected onSuccess(data: any): void {
    this.dataSource.data = data.content[0].parcelas;
    this.totalElements = data.totalElements;
  }

}
