import {Component, NgZone, OnInit} from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/firestore";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    isAdmin: boolean = false;
    // eposta: any = ""
    image: string;
    userName: any;
    istekler: [];
    istekleriGetir: any;

    constructor(
        public angularFireAuth: AngularFireAuth,
        public router: Router,
        public alertCtrl: AlertController,
        public angularFirestore: AngularFirestore,
        private zone: NgZone,
        public toastController: ToastController,
        public loadingController:LoadingController
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
            this.istekKutusunuGetir()
        });

        // let user = firebase.auth().currentUser;
        // try{
        //     this.eposta = user.email;
        // }
        // catch (e){
        //     console.log("sorun yok")
        // }

        const userId = firebase.auth().currentUser.uid;
        const userDoc = firebase.firestore().collection("admin").doc(userId);
        userDoc.get().then(doc => this.userName = doc.data().username)

    }

    async istekKutusu() {
        const toast = await this.toastController.create({
            message: "isteğiniz yetkililere iletilmiştir!",
            duration: 700,
            position: 'top',
            color: "success"
        });
        const userDoc = firebase.firestore().collection("istekler").doc('Animeler');
        await userDoc.update({
            istekAnimeler: firebase.firestore.FieldValue.arrayUnion(this.istekler)
        })
        await toast.present()

    }

    async istekKutusunuGetir() {
        const document = this.angularFirestore.collection('istekler').doc('Animeler')
        document.get().subscribe(x => {
            this.istekleriGetir = x.data()
            this.istekleriGetir = this.istekleriGetir.istekAnimeler;

        })
    }

    async istekleriTemizle(istekId) {
        const toast = await this.toastController.create({
            message: "Başarıyla Silindi!",
            duration: 500,
            position: 'top',
            color: "success"
        });
        const userDoc = firebase.firestore().collection("istekler").doc('Animeler')
        userDoc.get().then(function (doc) {
            if (istekId == doc.data().istekAnimeler.find(x => x === istekId)) {
                userDoc.update({
                    istekAnimeler: firebase.firestore.FieldValue.arrayRemove(istekId)
                })
                toast.present()

            }
        })
        await this.istekKutusunuGetir()
        this.istekleriTemizle(istekId);

        // await this.router.navigate(['home/feed'])
        // setTimeout(
        //     function () {
        //         location.reload()
        //     }, 500);
    }

    async logOut() {
        const toast = await this.toastController.create({
            message: "Başarıyla Çıkış Yaptınız..",
            duration: 700,
            position: 'top',
            color: "success"
        });
        return await this.angularFireAuth.signOut().then(() => {
            this.router.navigate(['login'])
            toast.present()
        })
    }

    async refresh() {
        const loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            spinner: 'circular',
            message: 'Sayfa yenileniyor...',
            duration: 700

        });
        await loading.present();
        this.istekKutusunuGetir()
    }
}