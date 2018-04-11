import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { RelatoriosService } from '../services/relatorios.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'relatorio-pedidos-periodo.component.html'
})
export class RelatorioPedidosPeriodoComponent implements OnInit {

    constructor(private httpService: RelatoriosService, private router: Router, private route: ActivatedRoute)
    {}
    movimentos = {
        data:[]
    };

    saldo_inicial = 0;

    tamanho = 0;

    total = 0;

    total_credito = 0;

    total_dinheiro = 0;

    total_cartao_debito = 0;

    total_cartao_credito = 0;

    total_prazo = 0;

    total_consumo = 0;

    total_cheque = 0;

    filtros = {
        filters:[]
    };

    data = new Date().toLocaleDateString();
    ngOnInit(): void {

        this.filtros = JSON.parse(localStorage.getItem('filtros_rel') || null);
        this.movimentos = JSON.parse(localStorage.getItem('rel_pedidos_filtros') || null);

        this.tamanho = this.movimentos.data.length;

        console.log('total',this.movimentos);
        console.log('total',this.tamanho);
        for(let i in this.movimentos.data)
        {
            if(this.movimentos.data[i].tipo_id == 1) {
                this.total_dinheiro += Number(this.movimentos.data[i].valor);
            }else if(this.movimentos.data[i].tipo_id == 2) {
                this.total_cartao_credito += Number(this.movimentos.data[i].valor);
            }else if(this.movimentos.data[i].tipo_id == 3) {
                this.total_cartao_debito += Number(this.movimentos.data[i].valor);
            }else if(this.movimentos.data[i].tipo_id == 4) {
                this.total_cheque += Number(this.movimentos.data[i].valor);
            }else if(this.movimentos.data[i].tipo_id == 5) {
                this.total_consumo += Number(this.movimentos.data[i].valor);
            }else if(this.movimentos.data[i].tipo_id == 6) {
                this.total_prazo += Number(this.movimentos.data[i].valor);
            }
        }
        setTimeout(() => {
            window.print();
        }, 4000);
    }

    gerarExcel()
    {
        window.open('data:application/vnd.ms-excel,' + jQuery('#relexc').html());
    }
}
