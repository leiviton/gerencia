import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { OrdersService } from '../services/orders.service';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute) { }
    order = {};
    client = '';
    products = {};
    mesas = {};
    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }

    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#successModal').on('show.bs.modal').show().addClass('show');
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'order')
                    .then((res) => {
                            this.order = res.data;
                            this.client = res.data.client.data.user.data.name;
                            this.products = res.data.items;
                            console.log(this.order);
                            this.hideLoading();
                    });
                this.httpService.setAccessToken();
                this.httpService.builder()
                    .list({},'mesas')
                    .then((res) => {
                        this.mesas = res.data;
                        console.log('mesas', this.mesas);
                    });

            });
        this.httpService.eventEmitter.emit();
    }

    close(){
        jQuery('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/orders']);
    }
}
