import { Component } from '@angular/core';
import {ToastyConfig} from "ng2-toasty";

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl:'./app.component.html'
})
export class AppComponent 
{
    constructor(private toasty: ToastyConfig){
      this.toasty.theme = 'bootstrap';
      this.toasty.position = 'top-center';
      this.toasty.timeout = 6000;
    }
}
