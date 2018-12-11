import {Component, ViewChild, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {ProdutosService} from '../services/produtos.service';
import {FormsModule} from '@angular/forms';

import * as jQuery from 'jquery';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'produtos.component.html'
})
export class ProdutosComponent implements OnInit {

    constructor(private httpService: ProdutosService, private router: Router
        , private notification: AppMessageService) {
    }

    cor = false;
    pesquisa: any = {
        inicio: null,
        fim: null,
        status: null
    };
    produtos = [];
    tamanho = 0;
    result = [];
    search = '';
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(() => {
                this.httpService.builder().list({}, 'products')
                    .then((res) => {
                        if (res.data) {
                            this.produtos = res.data;
                            this.result = this.produtos;
                            this.tamanho = res.data.length;
                        }
                        this.hideLoading();
                    });
            });
        this.httpService.eventEmitter.emit();
    }

    filteredProfessional(e) {
        let res = this.produtos;

        if (this.search) {
            this.result = res.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
            this.tamanho = this.result.length;
        } else {
            this.result = this.produtos;
            this.tamanho = this.result.length;
        }
    }

    edit(id) {
        this.cor = true;
        this.router.navigate(['/cadastro/produtos/edit/' + id]);
    }

    showModal() {
        jQuery(".modal").show().addClass('show');
    }

    hideModal() {
        jQuery(".modal").hide();
    }

    hideLoading() {
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading() {
        jQuery("#bifrostBarSpinner").show();
    }

    pesquisar(fields) {
        console.log(fields);
    }
}
