import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<div class="container-loading"><img class="img-loading" src="assets/img/loading.gif" /></div><toaster-container></toaster-container><router-outlet></router-outlet>'
})
export class AppComponent {


}
