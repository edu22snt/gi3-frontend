import { Component, OnInit } from '@angular/core';
import { PrestacaoServicoService } from '../../services/prestacao-servico/prestacao-servico.service';
import { HttpResponse } from '@angular/common/http';
import { IPrestacaoServico } from '../../entities/prestacao-servico';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-prestacao-servico',
  standalone: true,
  imports: [MatTableModule],
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
    'empresa'
  ];

  dataSource: IPrestacaoServico[] = [];

  constructor(
    private service: PrestacaoServicoService
  ) { }

  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (res: HttpResponse<IPrestacaoServico[]>) => {
        this.onSuccess(res.body);
      },
      error: (err) => {
        console.error('Erro ao carregar dados', err);
      }
    });
  }

  protected onSuccess(data: any): void {
    this.dataSource = data.content ?? [];
  }

}
