import { Component, OnInit } from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ProdutosService } from '../services/produtos.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: ProdutosService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    client = '';
    product = {
        name:null,
        description:null,
        price:null,
        category_id:null
    };
    groups = {};
    subgroups = {};
    ngOnInit(): void {
       this.showLoading();
        jQuery('#infoModal').show().addClass('show');
        setTimeout(() => {
            this.grupos();
            this.subgrupos();
            this.hideLoading();
        },300)
    }

    grupos()
    {
        this.httpService.builder()
            .list({},'groups')
            .then((res)=>{
                this.groups = res;
                console.log(this.groups);
            })
    }


    subgrupos()
    {
        this.httpService.builder()
            .list({},'subgroups')
            .then((res)=>{
                this.subgroups = res;
                console.log(this.subgroups);
            })
    }

    save(e)
    {
        this.showLoading();
        this.httpService.builder()
          .insert(e,'product/store')
          .then(()=> {
              this.httpService.eventEmitter.emit();
              this.hideLoading();
              this.toasterService.pop('success', 'Sucesso', 'Produto salvo com sucesso');
              this.close();
          });

    }

    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/produtos']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
