import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MesasService } from '../services/mesas.service';
import { FormsModule } from '@angular/forms';


import * as jQuery from 'jquery';
import {AppMessageService} from "../../../app-message.service";
@Component({
  templateUrl: 'mesas.component.html'
})
export class MesasComponent implements OnInit {
  constructor(private httpService: MesasService, private router: Router
  ,private notification: AppMessageService) {}
  cor = false;
  pesquisa:any = {
      inicio:null,
      fim:null,
      status:null
  };
  mesas = {
      data:[]
  };
  tamanho = 0;
  ngOnInit(): void {
      this.showLoading();
      let u = {role:null};
      u = JSON.parse(localStorage.getItem('user') || null);
      if(u.role !== 'gerente' && u.role !== 'admin')
      {
          this.notification.message('Erro','Sem permissão, contate o administrador','error');
          this.router.navigate(['/user/login']);
      }
      this.httpService.setAccessToken();
      this.httpService.eventEmitter
          .subscribe(() => {
              this.httpService.builder().list({}, 'mesas/all')
                  .then((res) => {
                      this.mesas = res;
                      this.tamanho = res.data.length;
                      this.hideLoading();
                  });
          });
      this.httpService.eventEmitter.emit();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/cadastro/mesas/edit/'+ id]);
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
        jQuery("#bifrostBarSpinner").hide();
    }
    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

    pesquisar(fields)
    {
        console.log(fields);
    }
}
