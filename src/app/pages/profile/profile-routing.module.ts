import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'add-anime',
    loadChildren: () => import('./add-anime/add-anime.module').then( m => m.AddAnimePageModule)
  },
  {
    path: 'edit-anime/:id',
    loadChildren: () => import('./edit-anime/edit-anime.module').then( m => m.EditAnimePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
