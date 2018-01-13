import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';


import * as jQuery from 'jquery';
@Component({
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {
  constructor(private httpService: UsersService, private router: Router,private toasterService: ToasterService) {}
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
      if(u.role !== 'gerente' && u.role !== 'admin')
      {
          this.toasterService.pop('error','Sem permissão','Usuário sem acesso, contate o administrador');
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
