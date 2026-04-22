import { NgxCurrencyDirective } from 'ngx-currency';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IRepasseBancorbras } from '../../entities/repasse-bancorbras';
import { RepasseBancorbrasService } from '../../services/repasse-bancorbras/repasse-bancorbras.service';
import { HttpResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RelatorioService } from '../../services/relatorio/relatorio.service';

@Component({
  selector: 'app-repasse-bancorbras',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    CurrencyPipe,
    DatePipe,
    MatFormField,
    MatLabel,
    FormsModule,
    MatInputModule,
    RouterLink,
    NgxCurrencyDirective
],
  templateUrl: './repasse-bancorbras.component.html',
  styleUrl: './repasse-bancorbras.component.scss'
})
export class RepasseBancorbrasComponent implements OnInit {

  displayedColumns: string[] = [
    'cliente',
    'contrato',
    'venda',
    'mes',
    'bem',
    'parcela',
    'valorBase',
    'comissaoGi3',
    'comissaoVendedor',
    'descontoComissao',
    'comissaoLiquida',
    'pg',
    'acoes'
  ];

  dataSource = new MatTableDataSource<IRepasseBancorbras>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';
  totalComissaoGi3 = 0;
  totalComissaoLiquida = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: RepasseBancorbrasService,
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
      next: (res: HttpResponse<IRepasseBancorbras[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  searchByKeyword(): void {
    this.pageIndex = 0;
    this.service.searchByKeyword(this.searchItem, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IRepasseBancorbras[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  private clearList(): void {
    this.dataSource.data = [];
  }

  protected onSuccess(data: any): void {
    this.clearList();
    this.dataSource.data = [...(data?.content || [])];
    this.totalElements = data?.totalElements || 0;
    this.calcularComissoes();
  }

  calcularComissoes(): void {
    this.totalComissaoGi3 = this.dataSource.data.reduce((total, item) => total + parseFloat(item.comissaoGi3), 0);
    this.totalComissaoLiquida = this.dataSource.data.reduce((total, item) => total + parseFloat(item.comissaoLiquida), 0);
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
      next: (res) => {
        console.log('Resposta da exclusão:', res);
        this.loadData();
        this.snackBar.open('Excluído com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        console.error('Erro ao excluir:', err);
        this.snackBar.open('Erro ao excluir', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  new(): void {
    this.router.navigate(['/repasse-bancorbras-form']);
  }

  imprimir(): void {
    this.relatorioService.relatorioBancorbras(this.searchItem);
  }

}
