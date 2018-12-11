import {Component, ViewChild, OnInit, ViewContainerRef} from '@angular/core';

import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';
import {ClientsService} from '../services/clients.service';
import {FormsModule} from '@angular/forms';


import * as jQuery from 'jquery';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'clients.component.html'
})
export class ClientsComponent implements OnInit {
    constructor(private httpService: ClientsService, private router: Router, private notification: AppMessageService) {
    }

    cor = false;
    pesquisa: any = {
        inicio: null,
        fim: null,
        status: null
    };
    clients = []
    tamanho = 0;

    result = [];
    search = '';
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(() => {
                this.httpService.builder().list({}, 'clients')
                    .then((res) => {
                        this.clients = res.data;
                        this.tamanho = res.data.length;
                        this.result = this.clients;
                        this.hideLoading();
                    });
            });
        this.httpService.eventEmitter.emit();
    }

    filteredProfessional(e) {
        let res = this.clients;

        if (this.search) {
            this.result = res.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
            this.tamanho = this.result.length;
        } else {
            this.result = this.clients;
            this.tamanho = this.result.length;
        }
    }

    edit(id) {
        this.cor = true;
        this.router.navigate(['/cadastro/clients/edit/' + id]);
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
