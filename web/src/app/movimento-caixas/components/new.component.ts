import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MovimentoCaixasService } from '../services/movimento-caixas.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: MovimentoCaixasService, private router: Router,
                private route: ActivatedRoute,private toasterService: AppMessageService
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
                        this.toasterService.message('Erro', 'Caixa está fechado.','error');
                    }else {
                        this.toasterService.message( 'Salvo', 'Movimento salvo com sucesso.','success');
                        this.close();
                    }
                })

        }else{
            this.hideLoading();
            this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','error');
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
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

}
