import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ProdutosService } from '../services/produtos.service';
import { FormsModule } from '@angular/forms';

import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: ProdutosService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService
    ) {}

    client = '';
    product = {
        id:null,
        name:null,
        description:null,
        price:null,
        category_id:null,
        status:null
    };

    groups = {};
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#infoModal').show().addClass('show');
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'product')
                    .then((res) => {
                        this.product.id = res.data.id;
                        this.product.name = res.data.name;
                        this.product.description = res.data.description;
                        this.product.price = res.data.price;
                        this.product.category_id = res.data.category.data.id;
                        this.product.status = res.data.status;
                        this.grupos();
                        this.hideLoading();
                    });
            });
        this.httpService.eventEmitter.emit();
    }

    grupos()
    {
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({},'groups')
            .then((res)=>{
                this.groups = res;
                console.log(this.groups);
            })
    }



    save(e)
    {
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('product')
            .update(this.product.id, e)
            .then(() => {
                this.httpService.eventEmitter.emit();
                this.hideLoading();
                this.toasterService.pop('success','Sucesso','Produto salvo com sucesso');
                this.close();
            })

    }

    excluir(status:number)
    {
        this.showLoading();
        this.product.status = status;
        this.httpService.setAccessToken();
        this.httpService.builder('product')
            .update(this.product.id,this.product)
            .then((res) =>{
                this.httpService.eventEmitter.emit();
                this.hideLoading();
                this.toasterService.pop('warning','informação','Produto inativado');
                this.close();
            })
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
