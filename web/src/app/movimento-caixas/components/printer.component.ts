import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as jQuery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { MovimentoCaixasService } from '../services/movimento-caixas.service';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'printer.component.html'
})
export class PrinterComponent implements OnInit {

    constructor(private httpService: MovimentoCaixasService, private router: Router, private route: ActivatedRoute
        ,private toasterService: ToasterService,public sanitizer: DomSanitizer)
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
                let url = params['url'] + '/printer/' + params['arquivo'];
                    this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(
                   "<object data='"+ url +"' name='my_iframe' onload='window.option();window.print();window.close()' type='application/pdf' height='500' width='780' class='embed-responsive-item'>" +
                    "Object " + params['url'] + " failed" +
                    "</object>");
                this.hideLoading();
            });
    }

    close(){
        jQuery('#printer').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/financeiro/movimento/caixas']);
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }

    showLoading(){
        jQuery(".container-loading").show();
    }

}
