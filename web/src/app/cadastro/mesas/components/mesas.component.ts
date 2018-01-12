import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';

import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MesasService } from '../services/mesas.service';
import { FormsModule } from '@angular/forms';


import * as jQuery from 'jquery';
@Component({
  templateUrl: 'mesas.component.html'
})
export class MesasComponent implements OnInit {
  constructor(private httpService: MesasService, private router: Router) {}
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
