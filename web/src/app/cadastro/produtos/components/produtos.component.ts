import { Component, ViewChild, OnInit,ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ProdutosService } from '../services/produtos.service';
import { FormsModule } from '@angular/forms';

import * as jQuery from 'jquery';
import {AppMessageService} from "../../../app-message.service";

@Component({
  templateUrl: 'produtos.component.html'
})
export class ProdutosComponent implements OnInit {

  constructor(private httpService: ProdutosService, private router: Router
      ,private notification: AppMessageService) {}
  cor = false;
  pesquisa:any = {
      inicio:null,
      fim:null,
      status:null
  };
  produtos:object = {};
  tamanho = 0;

  ngOnInit(): void {
      this.showLoading();
      this.httpService.setAccessToken();
      this.httpService.eventEmitter
          .subscribe(() => {
              this.httpService.builder().list({}, 'products')
                  .then((res) => {
                      if(res.data){
                          this.produtos = res;
                          this.tamanho = res.data.length;
                      }
                      this.hideLoading();
                  });
          });
      this.httpService.eventEmitter.emit();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/cadastro/produtos/edit/'+ id]);
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
