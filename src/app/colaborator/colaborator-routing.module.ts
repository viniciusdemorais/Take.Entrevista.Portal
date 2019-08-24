import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { ColaboratorComponent } from './colaborator.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/colaborator', pathMatch: 'full' },
    { path: 'colaborator', component: ColaboratorComponent, data: { title: extract('Colaborador') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ColaboratorRoutingModule {}
