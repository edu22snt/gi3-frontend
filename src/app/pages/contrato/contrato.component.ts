import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { RelatorioService } from '../../services/relatorio/relatorio.service';
import { ContratoService } from '../../services/contrato/contrato.service';
import { IContrato } from '../../entities/contrato';
import { MensagemSistamaEnum } from '../../core/config/enuns/mensagem-sistema.constants';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    RouterLink
],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.scss'
})
export class ContratoComponent implements OnInit {

  displayedColumns: string[] = [
    'numeroContrato',
    'vendedor',
    'tipo',
    'empresa',
    'acoes'
  ];

  dataSource = new MatTableDataSource<IContrato>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ContratoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private relatorioService: RelatorioService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.findAll(this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IContrato[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error(MensagemSistamaEnum.ERRO_CARREGAR_DADOS, erro);
      }
    });
  }

  searchByKeyword(): void {
    this.pageIndex = 0;
    this.service.searchByKeyword(this.searchItem, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IContrato[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error(MensagemSistamaEnum.ERRO_CARREGAR_DADOS, erro);
      }
    });
  }

  protected onSuccess(data: any): void {
    this.dataSource.data = data.content;
    this.totalElements = data.totalElements;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.loadData();
        this.snackBar.open(MensagemSistamaEnum.SUCESSO_EXCLUSAO, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: () => {
        this.snackBar.open(MensagemSistamaEnum.ERRO_EXCLUSAO, 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  new(): void {
    this.router.navigate(['/contrato-form']);
  }

  imprimir(): void {
    this.relatorioService.relatorioContratos(this.searchItem);
  }

}
