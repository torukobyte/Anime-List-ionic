import {Component, NgZone, OnInit} from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import {AngularFirestore} from "@angular/fire/firestore";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import firebase from "firebase";
import {AnimelistPage} from "../animelist/animelist.page";


@Component({
    selector: 'app-feed',
    templateUrl: './feed.page.html',
    styleUrls: ['./feed.page.scss'],
})

export class FeedPage implements OnInit {
    animeler: any;
    isAdmin: boolean = false;
    animeId: string;
    event: any;

    constructor(
        public aFirestore: AngularFirestore,
        public alertController: AlertController,
        public toastController: ToastController,
        public router: Router,
        private zone: NgZone,
        public loadingController: LoadingController
    ) {
    }

    ngOnInit() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .firestore().collection("admin/")
                    .doc(user.uid)
                    .get()
                    .then(userProfileSnapshot => {
                        try {
                            this.isAdmin = userProfileSnapshot.data().isAdmin;
                        } catch (e) {
                            console.log("sorun yok")
                        }

                    });
            } else {
                this.zone.run(() => {
                    this.router.navigate(['/login']).then(r => console.log("Giriş Yapmadan Giremezsin!!"));
                })

            }
        });
        this.getAnimes();
    }

    async getAnimes() {
        this.aFirestore.collection("Animeler").snapshotChanges().subscribe(data => {
            this.animeler = data.map(e => {
                return {
                    id: e.payload.doc.id,
                    title: e.payload.doc.data()["title"],
                    author: e.payload.doc.data()["author"],
                    summary: e.payload.doc.data()["summary"],
                    images: e.payload.doc.data()["images"]
                }
            })
        })
    }


    async animeListemeEkle(animeId) {
        const toast = await this.toastController.create({
            message: animeId + " Listenize Eklendi!",
            duration: 500,
            position: 'top',
            color: "success"
        });
        const toast1 = await this.toastController.create({
            message: animeId + " Zaten Listenizde Mevcut!!",
            duration: 1000,
            position: 'top',
            color: "danger"
        });

        const userId = firebase.auth().currentUser.uid;
        const userDoc = firebase.firestore().collection("admin").doc(userId);
        userDoc.get().then(function (doc) {

            if (animeId == doc.data().Favoriler.find(x => x === animeId)) {
                // console.log(animeId + " = " + doc.data().Favoriler.find(x => x === animeId))
                toast1.present();
                document.getElementById(animeId).hidden = true;
            } else {
                userDoc.update({
                    Favoriler: firebase.firestore.FieldValue.arrayUnion(animeId),
                })
                // console.log(animeId + " Başarıyla Listenize eklendi")
                toast.present();
            }
        })
        // setTimeout(
        //     function () {
        //         location.reload();
        //     }, 500);
    }

    async refresh() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            spinner: 'circular',
            message: 'Sayfa yenileniyor...',
            duration: 2000

        });
        await loading.present();
        setTimeout(
            function () {
                location.reload();
            }, 500);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async deleteAnime(id: string) {
        try {
            await this.aFirestore.collection("Animeler/").doc(id).delete();
            await this.toastCall("Başarıyla Silindi!")


        } catch (e) {
            await this.showAlert("HATA", e);
        }

    }

    async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header, message, buttons: ["Tamam"]
        })

        await alert.present();
    }

    async toastCall(mesaj: string) {
        const toast = await this.toastController.create({
            message: mesaj,
            duration: 500,
            position: 'top',
            color: "success"
        });
        await toast.present();
    }

}
