import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ToasterService} from 'angular2-toaster';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user') || null);
  show = false;
  constructor(private route: Router, private toasterService: ToasterService) {
    setInterval(() => {
        this.user = JSON.parse(localStorage.getItem('user') || null);
        if (this.user != null)
        {
          this.show = true;
        }
      }, 1000);
  }
  mesas = {};
  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
    console.log(this.user);
      if (!this.user){
        this.toasterService.pop('warning','Atenção','É necessário logar no sistema');
        this.route.navigateByUrl('/user/login');
      }
  }
}
