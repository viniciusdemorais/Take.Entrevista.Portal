import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '@app/shared/material/material-components.module';

import { NgxSmartModalModule } from 'ngx-smart-modal';



@NgModule({
  imports: [CommonModule, TranslateModule, CoreModule, SharedModule, MaterialModule,
    NgxSmartModalModule.forRoot(), HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule { }
