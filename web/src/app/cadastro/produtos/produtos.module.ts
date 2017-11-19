import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ProdutosComponent } from './components/produtos.component';
import { NewComponent } from './components/new.component';
import { EditComponent} from "./components/edit.component";
import { ProdutosRoutingModule } from './produtos-routing.module';

import { ProdutosService } from './services/produtos.service';

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    ProdutosRoutingModule,
    ChartsModule,
    BsDropdownModule
  ],
  declarations: [ ProdutosComponent, NewComponent, EditComponent],
  providers: [ ProdutosService ]
})
export class ProdutosModule { }
