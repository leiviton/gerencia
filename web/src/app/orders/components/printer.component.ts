import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as jQuery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
    templateUrl: 'printer.component.html'
})
export class PrinterComponent implements OnInit {

    constructor(private httpService: OrdersService, private router: Router, private route: ActivatedRoute
        ,public sanitizer: DomSanitizer)
    {

        document.onkeydown = ((e) =>{

            if(e.keyCode == 27)
            {
                this.close();
            }
        });
    }
    order = {
        id:0,
        link_printer:''
    };

    link_printer = '';

    innerHtml: SafeHtml;
    ngOnInit(): void {
        this.showLoading();
        this.httpService.setAccessToken();
        jQuery('#printer').on('show.bs.modal').show().addClass('show');
        this.route.params
            .subscribe(params => {
                let url = '';
                if(params['i'] == 'S'){
                    url = 'printer';
                }else if(params['i'] == 'N'){
                    url = 'printer/new'
                }
                this.httpService.builder().view(params['id'],url)
                    .then((res) => {
                            this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(
                                "<object data='"+res.data.link_printer+"' name='my_iframe' onload='window.option();window.print();window.close()' type='application/pdf' height='500' width='780' class='embed-responsive-item'>" +
                                "Object " + res.data.link_printer + " failed" +
                                "</object>");
                            this.link_printer = res.data.link_printer;

                    });
            });
        this.httpService.eventEmitter.emit();
    }

    imprimir(num, id)
    {
        window.focus();
        window.print();
    }

    close(){
        jQuery('#printer').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/orders']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }

}
