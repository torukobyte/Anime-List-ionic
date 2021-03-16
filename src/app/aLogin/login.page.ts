import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {AlertController, ToastController} from "@ionic/angular";


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user = {} as User;

    constructor(
        public afAuth: AngularFireAuth,
        public angularFirestore: AngularFirestore,
        public router: Router,
        public alertController: AlertController,
        public toastController: ToastController
    ) {
    }

    ngOnInit() {
    }

    async login(user: User) {
        try {
            await this.afAuth.signInWithEmailAndPassword(user.eposta, user.password);

            const toast = await this.toastController.create({
                message: "Hoşgeldiniz, iyi eğlenceler..",
                duration: 500,
                position: 'top',
                color: "success"
            });

            await toast.present()
            await this.router.navigate(['/home/feed'])

        } catch (err) {
            if (err.code == "auth/invalid-email") {
                await this.toastCall("Hatalı yada eksik bir E-Posta Girdiniz!")
            } else if (err.code == "auth/weak-password") {
                await this.toastCall("Şifre en az 6 haneli olmalı!")
            } else if (err.code == "auth/email-already-in-use") {
                await this.toastCall("Bu Eposta zaten kayıtlı, Giriş Yapmak için 'Giriş Yap' butonuna tıklayınız!");
            } else if (err.code == "auth/argument-error") {
                await this.toastCall("Eposta ve Şifre alanlarının doldurulması zorunludur!");
            } else if (err.code == "auth/wrong-password") {
                await this.toastCall("Hatalı Şifre!!")
            } else if (err.code == "auth/user-not-found") {
                await this.toastCall("Böyle bir kullanıcı YOK!")
            } else {
                console.dir(err);
                await this.toastCall(err.message);
            }
        }
    }


    async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header, message, buttons: ['Tamam']
        })

        await alert.present();
    }

    async toastCall(mesaj: string) {
        const toast = await this.toastController.create({
            message: mesaj,
            duration: 1000,
            position: 'bottom',
            color: "danger"
        });
        await toast.present();
    }


}
