import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ColaboratorRoutingModule } from './colaborator-routing.module';
import { ColaboratorComponent } from './colaborator.component';
import { MaterialModule } from '@app/shared/material/material-components.module';

import { NgxSmartModalModule } from 'ngx-smart-modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    NgxSmartModalModule.forRoot(),
    ColaboratorRoutingModule
  ],
  declarations: [ColaboratorComponent]
})
export class ColaboratorModule {}
