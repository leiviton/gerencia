import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CaixasService } from '../services/caixas.service';
import { FormsModule } from '@angular/forms';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: CaixasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService)
    {
        document.onkeydown = ((e) =>{

            if(e.keyCode == 27)
            {
                this.close();
            }
        });
    }
    caixa = {
        id:0,
        name:''
    };
    pesquisa = {
        value:null,
        telefone:null
    };
    result = {
        qtd:1
    };
    qtd = 1;
    editar = true;
    imprimir = false;
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#successModal').on('show.bs.modal').show().addClass('show');
        jQuery('name').disabled = false;
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'caixa')
                    .then((res) => {
                            this.caixa = res.data;
                            this.hideLoading();
                    });
                this.httpService.setAccessToken();

            });
    }

    save(e)
    {
        if(this.caixa.name != null && this.caixa.name.length > 4){
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder('caixa')
                .update(this.caixa.id, e)
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.toasterService.pop('success', 'Sucesso', 'Caixa salvo com sucesso');
                    this.hideLoading();
                    this.close();
                });
        }else{
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }
    }

    close(){
        jQuery('#successModal').hide();
        this.router.navigate(['/financeiro/caixas']);
    }

    habilitarEdicao()
    {
        this.editar = !this.editar;
    }
    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
