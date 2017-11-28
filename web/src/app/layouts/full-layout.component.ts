import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  constructor(private route: Router, private toasterService: ToasterService) {}

  user = JSON.parse(localStorage.getItem('user') || null);
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
    if (!this.user || this.user === null || this.user.id === undefined){
      
      this.toasterService.pop('warning','Atenção','É necessário logar no sistema');
      this.route.navigate(['/pages/login']);
      return;
    }
  }
}
