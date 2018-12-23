import {Component, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import {BsModalRef} from 'ngx-bootstrap/modal';

import {Router, ActivatedRoute} from '@angular/router';
import {NgForOf} from '@angular/common';
import {ReportsService} from '../services/reports.service';
import {FormsModule} from '@angular/forms';

import {environment} from '../../../environments/environment';

import {AppMessageService} from "../../app-message.service";


@Component({
    templateUrl: 'reports.component.html'
})
export class ReportsComponent implements OnInit {

    pesquisa: any = {
        inicio: null,
        fim: null,
        observacao: 'sim'
    };

    link_report = '';

    constructor(private httpService: ReportsService,
                private notification: AppMessageService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {

    }

    reportXLS() {

        this.showLoading();
        if (this.pesquisa.inicio !== null && this.pesquisa.fim !== null) {
            let data = new Array();
            data['inicio'] = this.pesquisa.inicio;
            data['fim'] = this.pesquisa.fim;

            this.httpService.builder().list({}, "orders/report/items?data[inicio]=" + this.pesquisa.inicio +
                "&data[fim]=" + this.pesquisa.fim + "&data[observacao]=" + this.pesquisa.observacao)
                .then((res) => {
                    this.hideLoading();
                    this.link_report = environment.server_url + '/printer/' + res + '.xls';

                    if (res.length > 0) {
                        this.notification.message('Sucesso', 'Relatorio gerado com sucesso', 'success');
                    } else if (res.length == 0) {
                        this.notification.message('Informação', 'Sem pedidos fechados com data a data selecionada', 'info');
                    }
                });
        } else {
            this.notification.message('Erro', 'Preencha inicio, fim e status para pesquisar.', 'error');
            this.hideLoading();
        }
    }

    report() {
        this.httpService.builder().list({}, "report?inicio=" + this.pesquisa.inicio +
            "&final=" + this.pesquisa.fim)
            .then((res) => {
                this.hideLoading();
                this.link_report = environment.server_url + '/printer/' + res + '.xls';
                this.notification.message('Sucesso', 'Relatorio gerado com sucesso', 'success');
                window.open(environment.server_url+'/reports/product_sales.pdf', '_blank');
            });
    }

    hideLoading() {
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading() {
        jQuery("#bifrostBarSpinner").show();
    }

    showModal(id) {
        jQuery(id).show().addClass('show');
    }

    hideModal(id) {
        jQuery(id).hide();
    }
}
