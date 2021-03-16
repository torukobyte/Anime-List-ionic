import {ApplicationRef, Component, NgZone, OnInit} from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import {AngularFirestore} from "@angular/fire/firestore";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import firebase from "firebase";

@Component({
    selector: 'app-search',
    templateUrl: './animelist.page.html',
    styleUrls: ['./animelist.page.scss'],
})
export class AnimelistPage implements OnInit {
    animeler: any;
    isAdmin: boolean = false;
    animeId: any;
    favorites: any;

    constructor(
        public aFirestore: AngularFirestore,
        public alertController: AlertController,
        public toastController: ToastController,
        public router: Router,
        private zone: NgZone,
        public loadingController:LoadingController
    ) {

    }

    ngOnInit() {
        this.getFavorites()
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
    }

    async getFavorites() {

        try {
            const userId = firebase.auth().currentUser.uid; //giriş yapmış olan kullanıcının idsi
            const document = this.aFirestore.collection("admin").doc(userId)
            document.get().subscribe(x => {
                this.favorites = x.data()
                this.favorites = this.favorites.Favoriler
            })
        } catch (e) {
            console.log("sorun yok devam et")
        }

    }

    async refresh(){
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            spinner: 'circular',
            message: 'Sayfa yenileniyor...',
            duration: 1000

        });
        await loading.present();
        this.getFavorites()
    }

    async animeListemdenSil(animeId) {
        const toast = await this.toastController.create({
            message: animeId + " Başarıyla Silindi!",
            duration: 500,
            position: 'top',
            color: "success"
        });
        const userId = firebase.auth().currentUser.uid;
        const userDoc = firebase.firestore().collection("admin").doc(userId)
        await userDoc.get().then(function (doc) {
            if (animeId == doc.data().Favoriler.find(x => x === animeId)) {
                userDoc.update({
                    Favoriler: firebase.firestore.FieldValue.arrayRemove(animeId)
                })
                toast.present()
            }
        })
        await this.getFavorites()
        // await this.router.navigate(['home/feed'])
        // setTimeout(
        //     function () {
        //         location.reload()
        //     }, 500);
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
