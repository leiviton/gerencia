import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute) {
    }

    order = {};
    client = '';
    items = {"items":[]};
    result = {};

    pesquisa = {
        value:null
    };


    ngOnInit(): void {
        this.showLoading();
        jQuery('#new_order').show().addClass('show');
        setTimeout(() => {
            this.hideLoading();
        },300)
    }

    buscar()
    {
        this.showLoading();

        this.httpService.builder('search')
            .search(this.pesquisa.value)
            .then((res) => {
                this.pesquisa.value = null;
                this.result = res.data;
                this.hideLoading();
                if(res.data.length>1){
                    jQuery('#pesquisa').show().addClass('show');
                }else{
                    if(res.data.length===1)
                    {
                        this.items.items.push(this.result[0]);
                        console.log('item',this.items);
                    }
                }
                console.log("pesquisou", this.result)
            });

        console.log("pesquisou", this.pesquisa)
    }

    close()
    {
        jQuery('#new_order').hide();
        this.router.navigate(['/orders']);
    }

    closeMd()
    {
        jQuery('#pesquisa').hide();
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}
