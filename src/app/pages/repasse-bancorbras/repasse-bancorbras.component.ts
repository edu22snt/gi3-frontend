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
    DatePipe
  ],
  templateUrl: './repasse-bancorbras.component.html',
  styleUrl: './repasse-bancorbras.component.scss'
})
export class RepasseBancorbrasComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: RepasseBancorbrasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

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
        this.snackBar.open('Excluído com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: () => {
        this.snackBar.open('Erro ao excluir', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  view(id: number):void {
    // Implementar lógica para visualizar detalhes do serviço
  }

  edit(id: number):void {
    // Implementar lógica para visualizar detalhes do serviço
  }
}
