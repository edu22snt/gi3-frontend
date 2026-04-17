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

  dataSource: IPrestacaoServico[] | null = [];

  constructor(
    private service: PrestacaoServicoService
  ) { }

  ngOnInit(): void {
    this.service.findAll().subscribe( (res: HttpResponse<IPrestacaoServico[]>) => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", res.body);
      this.dataSource = res.body;
    });

  }

}
