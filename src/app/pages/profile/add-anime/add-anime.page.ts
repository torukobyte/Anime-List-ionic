import {Component, OnInit} from '@angular/core';
import {Anime} from "../../../models/anime.model";
import {ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";


@Component({
    selector: 'app-add-anime',
    templateUrl: './add-anime.page.html',
    styleUrls: ['./add-anime.page.scss'],
})
export class AddAnimePage implements OnInit {
    anime = {} as Anime;

    constructor(
        public aFirestore: AngularFirestore,
        public router: Router,
        public toastController: ToastController
    ) {
    }

    ngOnInit() {
    }

    async createAnime(anime: Anime) {
        if ((this.anime.title && this.anime.author && this.anime.summary && this.anime.images) != null) {
            const property = {
                title: anime.title,
                author: anime.author,
                summary: anime.summary,
                images: anime.images
            }
            await this.aFirestore.collection("Animeler").doc(anime.title).set(property)
            await this.toastCall("Başarıyla Eklendi!", 250, 'top', "success")
            await this.router.navigate(['home/feed']);

        } else {
            await this.toastCall("Bütün Alanları Doldurmak ZORUNLUDUR!", 1000, 'top', "danger");
        }
    }

    async toastCall(mesaj: string, duration: number, position: any, color: string) {
        const toast = await this.toastController.create({
            message: mesaj,
            duration: duration,
            position: position,
            color: color
        });
        await toast.present();
    }

}
