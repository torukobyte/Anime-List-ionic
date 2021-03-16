import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAnimePage } from './edit-anime.page';

const routes: Routes = [
  {
    path: '',
    component: EditAnimePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAnimePageRoutingModule {}
