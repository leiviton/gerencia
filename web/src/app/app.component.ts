import { Component } from '@angular/core';
import {ToastyConfig} from "ng2-toasty";

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<div class="container-loading"><img class="img-loading" src="assets/img/loading.gif" /></div><toaster-container></toaster-container><ng2-toasty></ng2-toasty><router-outlet></router-outlet>'
})
export class AppComponent 
{
    constructor(private toasty: ToastyConfig){
      this.toasty.theme = 'bootstrap';
      this.toasty.position = 'top-center';
      this.toasty.timeout = 6000;
    }
}
