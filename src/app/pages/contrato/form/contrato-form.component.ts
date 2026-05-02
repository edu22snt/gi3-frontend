import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IContratoParcela } from '../../../entities/contrato-parcelas';
import { HttpResponse } from '@angular/common/http';
import { IContrato } from '../../../entities/contrato';
import { CommonModule } from '@angular/common';
import { ContratoParcelaService } from '../../../services/contrato-parcela/contrato-parcela.service';
import { IVendedor } from '../../../entities/vendedor';
import { VendedorService } from '../../../services/vendedor/vendedor.service';

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
    FormsModule,
    CommonModule
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
    'base',
    'comissao',
    'descontoComissao',
    'liquido',
    'status'
  ];

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';
  codigo = 0;
  
  vendedores: IVendedor[] = [];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private snackBar: MatSnackBar,
      private service: ContratoService,
      private serviceParcelas: ContratoParcelaService,
      private vendedorService: VendedorService
    ) {
    this.form = this.fb.group({
      id: [''],
      numeroContrato: ['', Validators.required],
      vendedor: [null],
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
      this.codigo = id ? +id : 0;
      this.loadData();
      console.log("id >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", id);
    }
    if (this.isViewMode) {
      this.form.disable();
    }
    this.loadVendedores(id);

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
      if (res.body) {
        this.idContrato = res.body.numeroContrato;
        const vendedorSelecionado = this.vendedores.find(
          v => v.id === res.body?.vendedor?.id
        );

        this.form.patchValue({
          ...res.body,
          vendedor: vendedorSelecionado
        });
      }
    });
  }

  loadData(): void {
    this.service.find(this.codigo).subscribe({
      next: (res: HttpResponse<IContrato>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  loadVendedores(id?: string | null): void {
    this.vendedorService.findAll().subscribe({
      next: (data) => {
        this.onSuccessVendedores(data.body);

        if (id) {
          this.loadById(+id);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar vendedores', error);
      }
    });
  }

  compareVendedor(v1: IVendedor, v2: IVendedor): boolean {
    return v1 && v2 ? v1.id === v2.id : v1 === v2;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  protected onSuccessVendedores(data: any): void {
    this.vendedores = data.content;
  }

  protected onSuccess(data: any): void {
    this.dataSource.data = data.parcelas;
    this.totalElements = data.totalElements;
  }

  protected popularParcelas(item: any): void {
    this.dataSource.data = item.parcelas;
  }

}
