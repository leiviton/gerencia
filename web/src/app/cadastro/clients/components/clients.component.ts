import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ClientsService } from '../services/clients.service';
import { FormsModule } from '@angular/forms';


import * as jQuery from 'jquery';
import {AppMessageService} from "../../../app-message.service";
@Component({
  templateUrl: 'clients.component.html'
})
export class ClientsComponent implements OnInit {
  constructor(private httpService: ClientsService, private router: Router, private notification: AppMessageService) {}
  cor = false;
  pesquisa:any = {
      inicio:null,
      fim:null,
      status:null
  };
  clients:object = {};
  tamanho = 0;

  ngOnInit(): void {
      this.showLoading();
      this.httpService.setAccessToken();
      this.httpService.eventEmitter
          .subscribe(() => {
              this.httpService.builder().list({}, 'clients')
                  .then((res) => {
                      this.clients = res;
                      this.tamanho = res.data.length;
                      this.hideLoading();
                  });
          });
      this.httpService.eventEmitter.emit();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/cadastro/clients/edit/'+ id]);
    }

    showModal()
    {
        jQuery(".modal").show().addClass('show');
    }
    hideModal()
    {
        jQuery(".modal").hide();
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }

    pesquisar(fields)
    {
        console.log(fields);
    }
}
