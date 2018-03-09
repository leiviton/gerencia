import { Injectable } from '@angular/core';

import { ToastyService, ToastOptions} from "ng2-toasty";

@Injectable()
export class AppMessageService {

    constructor(private toastyOptions: ToastOptions, private tosty: ToastyService){}

    message(titulo:string,message:string,type:string='default',time:number=5000)
    {
        this.toastyOptions = {
            title:titulo,
            msg:message,
            timeout:time,
        };

        switch (type) {
            case 'default': this.tosty.default(this.toastyOptions); break;
            case 'info': this.tosty.info(this.toastyOptions); break;
            case 'success': this.tosty.success(this.toastyOptions); break;
            case 'wait': this.tosty.wait(this.toastyOptions); break;
            case 'error': this.tosty.error(this.toastyOptions); break;
            case 'warning': this.tosty.warning(this.toastyOptions); break;
        }
    }
}