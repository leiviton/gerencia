import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OpenCloseCaixasService } from "../services/open-close-caixas.service"
import { FormsModule } from '@angular/forms';

import {AppMessageService} from "../../app-message.service";

@Component({
    templateUrl: 'open-close.component.html'
})
export class OpenCloseComponent implements OnInit {

    constructor(private httpService: OpenCloseCaixasService, private router: Router,
                private route: ActivatedRoute,private toasterService: AppMessageService)
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

    date = '';

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
        if(this.date != '') {
            if (this.caixa_id != null) {
                this.showLoading();
                let data = {
                    'caixa_id': this.caixa_id,
                    'data_caixa': this.date
                };
                this.httpService.setAccessToken();
                this.httpService.builder()
                    .insert(data, 'open/close')
                    .then((res) => {
                        if(res == 'data_diverge') {
                            this.hideLoading();
                            this.toasterService.message('Erro','Data diferente da data atual','error');
                        }else if (res === 'fechado') {
                                this.toasterService.message('Erro', 'Caixa está fechado','error');
                                this.hideLoading();
                        } else if(res === 'caixa_aberto_o_data') {
                                this.toasterService.message('Erro', 'Caixa está aberto em outra data','error');
                                this.hideLoading();
                        }else if(res == 'ok') {
                            this.httpService.eventEmitter.emit();
                            this.toasterService.message('Sucesso', 'Saque salvo com sucesso','success');
                            this.hideLoading();
                            this.close();
                        }
                    });
            } else {
                this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','error');
            }
        }else{
            this.toasterService.message('Erro', 'Data não pode ser vazia','error');
        }
    }

    close(){
        jQuery('#successModal').hide();
        this.router.navigate(['/financeiro/open/close/caixas']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
