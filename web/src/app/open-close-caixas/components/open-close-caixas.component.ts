import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OpenCloseCaixasService } from '../services/open-close-caixas.service';
import { FormsModule } from '@angular/forms';

import * as jQuery from 'jquery';
@Component({
  templateUrl: 'open-close-caixas.component.html'
})
export class OpenCloseCaixasComponent implements OnInit {

  constructor(private httpService: OpenCloseCaixasService, private router: Router, private toasterService: ToasterService) {
      document.onkeydown = ((e) =>{
          if(e.keyCode == 113)
          {
              return this.showModal('#mov');
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
        caixa_id:1,
        user:'todos'
    };
    movimentos = {
        data:[]
    };
    total = 0;
    usuarios = {
        data:[]
    };
  ngOnInit(): void {
      this.showLoading();
      let u = {role:null};
      u = JSON.parse(localStorage.getItem('user') || null);
      if(u == null){
          this.toasterService.pop('error','Sem permissão','Usuário sem acesso, contate o administrador');
          this.router.navigate(['/']);
      }

      if(u.role !== 'gerente' && u.role !== 'admin' )
      {
          this.toasterService.pop('error','Sem permissão','Usuário sem acesso, contate o administrador');
          this.router.navigate(['/dashboard']);
      }

      this.httpService.setAccessToken();
      this.httpService.eventEmitter
          .subscribe(() => {
                  this.httpService.builder()
                      .list({},'open/close/caixa')
                      .then((res) => {
                        this.movimentos = res;
                        this.tamanho = res.data.length;
                      });
      });
      this.httpService.eventEmitter.emit();
      setTimeout(this.hideLoading(),2000);
      this.getCaixas();
      this.getUser();

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

    getUser()
    {
        this.httpService.builder()
            .list({},'users')
            .then((res) => {
                this.usuarios = res;
            });
    }

    pesquisar()
    {

        this.showLoading();
        if(this.pesquisa.inicio !== null)
        {
            if(this.pesquisa.fim == null) {
                this.pesquisa = this.pesquisa.inicio;
                this.total = 0;
                let options = {
                    filters: [
                        {user: this.pesquisa.user},
                        {caixa_id: this.pesquisa.caixa_id},
                        {inicio: this.pesquisa.inicio},
                        {fim: this.pesquisa.fim}
                    ]
                };
                this.httpService.builder().list(options, 'open/close')
                    .then((res) => {
                        this.movimentos = res;
                        console.log(this.movimentos);
                        this.tamanho = res.data.length;
                        let i;

                        for (i = 0; i < res.data.length; i++) {
                            if (res.data[i].tipo_movimento === 'credito') {
                                this.total += res.data[i].valor;
                            } else if (res.data[i].tipo_movimento === 'debito') {
                                this.total -= res.data[i].valor;
                            }
                        }
                        this.hideModal('#mov');
                        this.hideLoading();
                        this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');

                    });
            }
        }else  {
            this.toasterService.pop('error', 'Erro', 'Preencha inicio e caixa para pesquisar.');
            this.hideLoading();
        }
    }
    new()
    {
       return this.router.navigate(['/financeiro/open/close/caixas/abrir']);
    }

    openReal() {
        this.hideModal('#rel');
        window.open('/#/relatorios/relatorio-movimento-caixa', '_blank');
    }

    gerarRel()
    {
        this.showLoading();
        if(this.pesquisa.inicio != null && this.pesquisa.inicio != '')
        {
            let options = {
                filters: [
                    {user: this.pesquisa.user},
                    {caixa_id: this.pesquisa.caixa_id},
                    {inicio: this.pesquisa.inicio},
                    {fim: this.pesquisa.inicio}
                ]
            };
            this.httpService.builder()
                .list(options,'relatorio/fechamento/caixa')
                .then((res)=>{
                    this.hideLoading();
                    localStorage.setItem('mov_caixa_rel',JSON.stringify(res));
                    this.openReal();
                    this.toasterService.pop('success','Sucesso','Relátorio gerado com sucesso');
                });
        }else{
            this.showLoading();
        }
    }


    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }

    showModal(id)
    {
        jQuery(id).show().addClass('show');
    }
    hideModal(id)
    {
        jQuery(id).hide();
    }
}
