import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAnimePageRoutingModule } from './edit-anime-routing.module';

import { EditAnimePage } from './edit-anime.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAnimePageRoutingModule
  ],
  declarations: [EditAnimePage]
})
export class EditAnimePageModule {}
