import { Component, OnInit, ViewChild } from '@angular/core';
import { IUsuario } from '../../entities/usuario';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { HttpResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatFormField,
    MatLabel,
    FormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule
],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'username',
    'roles',
    'acoes'
  ];

  dataSource = new MatTableDataSource<IUsuario>();

  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;
  searchItem = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.findAll(this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IUsuario[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  searchByKeyword(): void {
    this.pageIndex = 0;
    console.log('Parâmetro de busca:', this.searchItem);
    this.service.searchByKeyword(this.searchItem, this.pageIndex, this.pageSize).subscribe({
      next: (res: HttpResponse<IUsuario[]>) => {
        this.onSuccess(res.body);
      },
      error: (erro) => {
        console.error('Erro ao carregar dados', erro);
      }
    });
  }

  protected onSuccess(data: any): void {
    console.log('Dados recebidos:', data);
    this.dataSource.data = data.content;
    this.totalElements = data.totalElements;
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  confirmDelete(usuario: IUsuario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tratarExclusao(usuario);
      }
    });
  }

  tratarExclusao(usuario: IUsuario): void {
    if(usuario.username === 'admin') {
      this.snackBar.open('Não é permitido excluir o usuário admin', 'Fechar', {
        duration: 3000,
        panelClass: ['snackbar-error']
      });
      return;
    }
    this.delete(usuario);
  }

  delete(usuario: IUsuario): void {

    this.service.delete(usuario.id).subscribe({
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

  new(): void {
    this.router.navigate(['/usuario-form']);
  }

}
