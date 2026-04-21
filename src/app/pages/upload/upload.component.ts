import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Component } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardActions, MatCard, MatCardTitle, MatCardContent, MatCardModule } from "@angular/material/card";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatCardActions,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatProgressSpinnerModule
],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {
  selectedFile!: File;
  fileName: string = '';
  errorMessage: string = '';
  loading = false;
  tipoPlanilha: string = '';

  constructor(
    private service: UploadService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) return;

    if (!file.name.endsWith('.xlsx')) {
      this.errorMessage = 'Apenas arquivos .xlsx são permitidos';
      this.selectedFile = undefined!;
      this.fileName = '';
      return;
    }

    this.errorMessage = '';
    this.selectedFile = file;
    this.fileName = file.name;
  }

  upload() {
    if (!this.selectedFile || !this.tipoPlanilha) return;
    this.loading = true;
    if (this.tipoPlanilha === 'BANCORBRAS') {
      this.uploadBancorbras();
    } else if (this.tipoPlanilha === 'HS') {
      this.uploadHs();
    } else if (this.tipoPlanilha === 'PRESTACAO_SERVICO') {
      this.uploadPrestacaoServico();
    }
  }

  uploadBancorbras(): void {
    this.service.uploadBancorbras(this.selectedFile).subscribe({
      next: (res: string) => {
        this.loading = false;
        this.snackBar.open(res, 'Fechar', { duration: 3000 });
        this.reset();
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erro ao importar as informações Bancorbrás', 'Fechar', { duration: 3000 });
      }
    });
  }

  uploadHs(): void {
    this.service.uploadHs(this.selectedFile).subscribe({
      next: (res: string) => {
        console.log("Resposta do upload HS:", res);
        this.loading = false;
        this.snackBar.open(res, 'Fechar', { duration: 3000});
        this.reset();
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.snackBar.open('Erro ao importar as informações HS', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  uploadPrestacaoServico(): void {
    this.service.uploadPrestacaoServico(this.selectedFile).subscribe({
      next: (res: string) => {
        this.loading = false;
        this.snackBar.open(res, 'Fechar', { duration: 3000 });
        this.reset();
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Erro ao importar as informações de prestação de serviço', 'Fechar', { duration: 3000 });
      }
    });
  }

  reset() {
    this.selectedFile = undefined!;
    this.fileName = '';
  }
}
