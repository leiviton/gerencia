import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MovimentoCaixasService } from '../services/movimento-caixas.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: MovimentoCaixasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    movimento = {
        tipo_movimento:'credito',
        valor:0,
        historico:null,
        caixa_id:1
    };
    caixas = {data:[]};
    ngOnInit(): void {
       this.showLoading();
        jQuery('#infoModal').show().addClass('show');
        this.getCaixas();
        setTimeout(() => {
            this.hideLoading();
        },300)
    }

    tipos_mov = [
        {
           value:'credito',
           label:'Crédito'
        },
        {
            value: 'debito',
            label:'Débito'
        }
    ];

    save()
    {
        this.showLoading();
        if(this.movimento.tipo_movimento != null && this.movimento.valor > 0 &&
            this.movimento.historico != null && this.movimento.historico.length > 6){

            this.httpService.builder()
                .insert(this.movimento,'movimento/caixa')
                .then((res) => {
                    this.hideLoading();
                    if(res == 'fechado')
                    {
                        this.toasterService.pop('error', 'Erro', 'Caixa está fechado.');
                    }else {
                        this.toasterService.pop('success', 'Salvo', 'Movimento salvo com sucesso.');
                        this.close();
                    }
                })

        }else{
            this.hideLoading();
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }

    }

    getCaixas()
    {
        this.httpService.builder()
            .list({},'caixas')
            .then((res)=>{
                this.caixas = res;
            });
    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/financeiro/movimento/caixas']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
