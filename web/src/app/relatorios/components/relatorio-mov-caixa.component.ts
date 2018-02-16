import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { RelatoriosService } from '../services/relatorios.service';
import { FormsModule } from '@angular/forms';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'relatorio-mov-caixa.component.html'
})
export class RelatorioMovCaixaComponent implements OnInit {

    constructor(private httpService: RelatoriosService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService)
    {
        document.onkeydown = ((e) =>{


        });
    }
    movimentos = {
        data:{}
    };

    ngOnInit(): void {
        this.movimentos = JSON.parse(localStorage.getItem('mov_caixa_rel') || null);

        console.log(this.movimentos);
        window.print();
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
