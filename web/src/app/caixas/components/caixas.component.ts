import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { CaixasService } from '../services/caixas.service';
import { FormsModule } from '@angular/forms';



import * as jQuery from 'jquery';
@Component({
  templateUrl: 'caixas.component.html'
})
export class CaixasComponent implements OnInit {

  constructor(private httpService: CaixasService, private router: Router, private toasterService: ToasterService) {
      document.onkeydown = ((e) =>{
          if(e.keyCode == 113)
          {
              return this.showModal();
          }
      });
  }

  cor = false;

  caixas = {
      data:[]
  };
  tamanho = 0;
    pesquisa:any = {
        inicio:null,
        fim:null,
        status:null
    };
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
              this.httpService.builder().list({}, 'caixas')
                  .then((res) => {
                      this.caixas = res;
                      this.tamanho = res.data.length;
                      this.hideLoading();
                  });
          });
      this.httpService.eventEmitter.emit();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/financeiro/caixas/edit/'+ id]);
    }

    new()
    {
       return this.router.navigate(['/orders/new']);
    }


    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }

    showModal()
    {
        jQuery(".modal").show().addClass('show');
    }
    hideModal()
    {
        jQuery(".modal").hide();
    }
}
