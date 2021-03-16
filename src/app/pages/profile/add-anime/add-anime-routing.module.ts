import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAnimePage } from './add-anime.page';

const routes: Routes = [
  {
    path: '',
    component: AddAnimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAnimePageRoutingModule {}
