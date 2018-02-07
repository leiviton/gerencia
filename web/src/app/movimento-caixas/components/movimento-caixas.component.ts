import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MovimentoCaixasService } from '../services/movimento-caixas.service';
import { FormsModule } from '@angular/forms';



import * as jQuery from 'jquery';
@Component({
  templateUrl: 'movimento-caixas.component.html'
})
export class MovimentoCaixasComponent implements OnInit {

  constructor(private httpService: MovimentoCaixasService, private router: Router, private toasterService: ToasterService) {
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
        caixa_id:1
    };
    movimentos = {
        data:[]
    };
    total = 0;
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
      setTimeout(this.hideLoading(),2000);
      this.getCaixas();
  }

    edit(id)
    {
        this.cor = true;
        this.router.navigate(['/financeiro/movimento/caixas/edit/'+ id]);
    }

    getCaixas()
    {
        this.httpService.builder()
            .list({},'caixas')
            .then((res) => {
                this.caixas = res;
            });
    }

    pesquisar()
    {

        this.showLoading();
        if(this.pesquisa.inicio !== null && this.pesquisa.fim !== null)
        {
            this.total = 0;
            let options = {
                filters: [
                    {caixa_id: this.pesquisa.caixa_id},
                    {inicio: this.pesquisa.inicio},
                    {fim: this.pesquisa.fim}
                ]
            };
            this.httpService.builder().list(options, 'movimento/caixas/filters')
                .then((res) => {
                    this.movimentos = res;
                    console.log(this.movimentos);
                    this.tamanho = res.data.length;
                    let i;

                    for(i = 0; i < res.data.length; i++)
                    {
                        if(res.data[i].tipo_movimento === 'credito') {
                            this.total += res.data[i].valor;
                        }else if(res.data[i].tipo_movimento === 'debito'){
                            this.total -= res.data[i].valor;
                        }
                    }
                    this.hideModal();
                    this.hideLoading();
                    this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');

                });
        }else  {
            this.toasterService.pop('error', 'Erro', 'Preencha inicio, fim e status para pesquisar.');

            this.hideLoading();
        }
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