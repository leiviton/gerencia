import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OpenCloseCaixasService } from "../services/open-close-caixas.service"
import { FormsModule } from '@angular/forms';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'open-close.component.html'
})
export class OpenCloseComponent implements OnInit {

    constructor(private httpService: OpenCloseCaixasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService)
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
                            this.toasterService.pop('error','Erro','Data diferente da data atual');
                        }else{
                            if (res === 'fechado') {
                                this.toasterService.pop('error', 'Erro', 'Caixa está fechado');
                                this.hideLoading();
                            } else {
                                this.httpService.eventEmitter.emit();
                                this.toasterService.pop('success', 'Sucesso', 'Saque salvo com sucesso');
                                this.hideLoading();
                                this.close();
                            }
                        }
                    });
            } else {
                this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
            }
        }else{
            this.toasterService.pop('error', 'Erro', 'Data não pode ser vazia');
        }
    }

    close(){
        jQuery('#successModal').hide();
        this.router.navigate(['/financeiro/open/close/caixas']);
    }


    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
