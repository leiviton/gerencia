import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { RelatoriosService } from '../services/relatorios.service';
import { FormsModule } from '@angular/forms';


@Component({
    templateUrl: 'relatorio-mov-caixa.component.html'
})
export class RelatorioMovCaixaComponent implements OnInit {

    constructor(private httpService: RelatoriosService, private router: Router, private route: ActivatedRoute)
    {}
    movimentos = {
        data:[]
    };

    saldo_inicial = 0;

    tamanho = 0;

    total = 0;

    total_credito = 0;

    total_debito = 0;

    filtros = {
        filters:[]
    };

    data = new Date().toLocaleDateString();

    data_caixa = '';
    caixa = '';

    ngOnInit(): void {

        this.filtros = JSON.parse(localStorage.getItem('filtros_rel') || null);
        let data = this.filtros.filters[2].inicio;

        this.data_caixa = new Date(data).toISOString().substr(0, 10).split('-').reverse().join('/');

        this.httpService.builder()
            .view(this.filtros.filters[1].caixa_id,'caixa')
            .then((res)=>{
               this.caixa = res.data.name;
            });

        this.httpService.builder()
            .list({},'open/?data='+data)
            .then((res) => {
               for (let i in res.data)
               {
                   if(res.data[i].tipo == 'A'){
                       this.saldo_inicial = res.data[i].saldo;
                   }
               }

                this.movimentos = JSON.parse(localStorage.getItem('mov_caixa_rel') || null);
                this.tamanho = this.movimentos.data.length;

                this.total = this.saldo_inicial;

                for(let i in this.movimentos.data)
                {
                    if(this.movimentos.data[i].tipo_movimento === 'credito') {
                        this.total += this.movimentos.data[i].valor;
                        this.total_credito += this.movimentos.data[i].valor;
                    }else if(this.movimentos.data[i].tipo_movimento === 'debito'){
                        this.total -= this.movimentos.data[i].valor;
                        this.total_debito += this.movimentos.data[i].valor;
                    }
                }

            });

        console.log(this.movimentos);


        setTimeout(() => {
            window.print();
        }, 4000);
    }
}
