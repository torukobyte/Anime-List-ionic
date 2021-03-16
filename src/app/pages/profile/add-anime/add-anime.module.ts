import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAnimePageRoutingModule } from './add-anime-routing.module';

import { AddAnimePage } from './add-anime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAnimePageRoutingModule
  ],
  declarations: [AddAnimePage]
})
export class AddAnimePageModule {}
