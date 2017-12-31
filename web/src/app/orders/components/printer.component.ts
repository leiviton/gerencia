import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'printer.component.html'
})
export class PrinterComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService)
    {
        document.onkeydown = ((e) =>{

            if(e.keyCode == 27)
            {

            }
        });
    }
    order = {
        id:0
    };

    link_printer = '';

    innerHtml = '';
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#printer').on('show.bs.modal').show().addClass('show');
        this.route.params
            .subscribe(params => {
                this.httpService.builder().view(params['id'],'printer')
                    .then((res) => {
                        this.order.id = res.data.id;
                            this.link_printer = 'http://108.61.155.169' + res.data.link_printer;

                    });
            });
        this.httpService.eventEmitter.emit();
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
