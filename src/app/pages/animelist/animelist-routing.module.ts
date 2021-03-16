import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimelistPage } from './animelist.page';

const routes: Routes = [
  {
    path: '',
    component: AnimelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimelistRoutingModule {}
