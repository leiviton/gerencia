import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';

import * as jQuery from 'jquery';
import {AppMessageService} from "../../../app-message.service";

@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  constructor(private httpService: UsersService, private router: Router,
              private toasterService: AppMessageService) {}
  cor = false;
  pesquisa:any = {
      inicio:null,
      fim:null,
      status:null
  };
  users:object = {};
  tamanho = 0;

  ngOnInit(): void {
      this.showLoading();
      let u = {role:null};
      u = JSON.parse(localStorage.getItem('user') || null);
      if(u.role !== 'gerente' && u.role !== 'admin' && u.role !== 'superuser')
      {
          this.toasterService.message('Sem permissão','Usuário sem acesso, contate o administrador','error');
          this.router.navigate(['/dashboard']);
      }
      this.httpService.setAccessToken();
      this.httpService.eventEmitter
          .subscribe(() => {
              this.httpService.builder().list({}, 'users')
                  .then((res) => {
                      this.users = res;
                      this.tamanho = res.data.length;
                      this.hideLoading();
                  });
          });
      this.httpService.eventEmitter.emit();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/cadastro/users/edit/'+ id]);
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
