import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CaixasService } from '../services/caixas.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'saque.component.html'
})
export class SaqueComponent implements OnInit {

    constructor(private httpService: CaixasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: AppMessageService)
    {
        document.onkeydown = ((e) =>{

            if(e.keyCode == 27)
            {
                this.close();
            }
        });
    }
    caixas = {
    };
    valor = 0;

    caixa_id = 1;

    historico = '';

    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#successModal').on('show.bs.modal').show().addClass('show');
        this.httpService.builder().list({}, 'caixas')
            .then((res) => {
                if(res) {
                    this.caixas = res;
                }
                this.hideLoading();
            });
    }

    save()
    {
        if(this.valor > 0) {
            if (this.caixa_id != null) {
                this.showLoading();
                let data = {
                    'caixa_id': this.caixa_id,
                    'valor': this.valor,
                    'historico': this.historico
                };
                this.httpService.setAccessToken();
                this.httpService.builder()
                    .insert(data, 'saque')
                    .then((res) => {
                        this.httpService.eventEmitter.emit();
                        this.hideLoading();
                        if(res == 'fechado')
                        {
                            this.toasterService.message('Erro', 'Caixa fechado','error');
                        }else {
                            this.toasterService.message('Sucesso', 'Saque salvo com sucesso','success');
                            this.close();
                        }
                    });
            } else {
                this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','success');
            }
        }else{
            this.toasterService.message('Erro', 'Valor não pode ser menor ou igual a zero','error');
        }
    }

    close(){
        jQuery('#successModal').hide();
        this.router.navigate(['/financeiro/caixas']);
    }


    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

}
