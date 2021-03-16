import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnimelistRoutingModule } from './animelist-routing.module';

import { AnimelistPage } from './animelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnimelistRoutingModule
  ],
  declarations: [AnimelistPage]
})
export class AnimelistModule {}
