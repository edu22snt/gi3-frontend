import { Component, OnInit, ViewChild } from '@angular/core';
import { PrestacaoServicoService } from '../../services/prestacao-servico/prestacao-servico.service';
import { HttpResponse } from '@angular/common/http';
import { IPrestacaoServico } from '../../entities/prestacao-servico';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prestacao-servico',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './prestacao-servico.component.html',
  styleUrl: './prestacao-servico.component.scss'
})
export class PrestacaoServicoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'vendedor',
    'contrato',
    'parcela',
    'valor',
    'empresa',
    'acoes'
  ];

  dataSource = new MatTableDataSource<IPrestacaoServico>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: PrestacaoServicoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.findAll(this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IPrestacaoServico[]>) => {
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

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  confirmDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
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
