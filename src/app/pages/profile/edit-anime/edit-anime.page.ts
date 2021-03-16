import {Component, OnInit} from '@angular/core';
import {Anime} from "../../../models/anime.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/firestore";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-edit-anime',
    templateUrl: './edit-anime.page.html',
    styleUrls: ['./edit-anime.page.scss'],
})
export class EditAnimePage implements OnInit {
    anime = {} as Anime;
    id: any;

    constructor(
        public activatedRoute: ActivatedRoute,
        public angularFirestore: AngularFirestore,
        public toastController: ToastController,
        public router: Router
    ) {
        this.id = this.activatedRoute.snapshot.paramMap.get("id");
    }

    ngOnInit() {
        this.getAnimeById(this.id);
    }

    async getAnimeById(id: string) {
        await this.angularFirestore.doc("Animeler/" + id).valueChanges().subscribe(data => {
            this.anime.title = data['title'],
                this.anime.author = data['author'],
                this.anime.summary = data['summary'],
                this.anime.images = data['images']
        })
    }

    async editAnime(anime: Anime) {
        if ((this.anime.title && this.anime.author && this.anime.summary && this.anime.images) != "") {
            await this.angularFirestore.doc("Animeler/" + this.id).update(anime);
            await this.toastCall("Başarıyla Güncellendi!", 250, 'top', "success")
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
