import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CaixasService } from '../services/caixas.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'transferencia.component.html'
})
export class TransferenciaComponent implements OnInit {

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
    caixas1 = {
    };
    valor = 0;

    caixa1 = 0;

    caixa2 = 0;


    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#successModal').on('show.bs.modal').show().addClass('show');
        this.httpService.builder().list({}, 'caixas')
            .then((res) => {
                if(res) {
                    this.caixas = res;
                    this.caixas1 = res;
                }
                this.hideLoading();
            });
    }

    save()
    {
        if(this.valor > 0) {
            if (this.caixa1 != null && this.caixa2 != null && this.caixa1 != this.caixa2) {
                this.showLoading();
                let data = {
                    'caixa1': this.caixa1,
                    'caixa2': this.caixa2,
                    'valor': this.valor
                };
                this.httpService.setAccessToken();
                this.httpService.builder()
                    .insert(data, 'transferencia')
                    .then((res) => {
                        this.httpService.eventEmitter.emit();
                        if(res == 'fechado_origem')
                        {
                            this.toasterService.message('Erro', 'Caixa origem fechado','error');
                        }else if (res == 'fechado_destino') {
                            this.toasterService.message('Erro', 'Caixa destino fechado','error');
                        }else{
                            this.toasterService.message('Sucesso', 'Transferencia salva com sucesso','success');
                            this.hideLoading();
                            this.close();
                        }
                    });
            } else {
                this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','error');
            }
        } else {
            this.toasterService.message('Erro', 'Valor não pode ser menor ou igual a zero.','error');
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
