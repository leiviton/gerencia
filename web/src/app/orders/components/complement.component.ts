import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as jQuery from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../services/orders.service';


import {ToasterService} from 'angular2-toaster';

@Component({
    templateUrl: 'complement.component.html'
})
export class ComplementComponent implements OnInit{

    ngOnInit(): void {
        jQuery('#complement').show().addClass('show');
    }

    close(){

    }

}