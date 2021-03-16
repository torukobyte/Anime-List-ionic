import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AlertController, ToastController} from "@ionic/angular"
import {Router} from "@angular/router";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase/app";


@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    user = {} as User;
    cPassword: any;
    username: string;
    favorites: string[] = Array();

    constructor(
        public afAuth: AngularFireAuth,
        public router: Router,
        public alertControl: AlertController,
        public angularFirestore: AngularFirestore,
        public toastController: ToastController
    ) {
    }

    ngOnInit() {
    }

    async register(user: User) {
        try {
            if (user.password !== this.cPassword) {
                await this.toastCall("Şifler Aynı Değil!");
            } else {
                await this.afAuth.createUserWithEmailAndPassword(user.eposta, user.password);
                const realId = firebase.auth().currentUser.uid;

                const isAdmin = {
                    eposta: user.eposta,
                    "isAdmin": false,
                    "username": this.username,
                    "Favoriler": this.favorites
                }
                await this.angularFirestore.collection("admin").doc(realId).set(isAdmin)
                await this.showAlert("Onay", "Aramıza Hoş Geldin ");
                await this.router.navigate(['/login']);
            }

        } catch (err) {
            if (err.code == "auth/invalid-email") {
                await this.toastCall("Hatalı yada eksik bir E-Posta Girdiniz!")
            } else if (err.code == "auth/weak-password") {
                await this.toastCall("Şifre en az 6 haneli olmalı!")
            } else if (err.code == "auth/email-already-in-use") {
                await this.toastCall("Bu Eposta zaten kayıtlı, Giriş Yapmak için 'Giriş Yap' butonuna tıklayınız!");
            } else if (err.code == "auth/argument-error") {
                await this.toastCall("Eposta ve Şifre alanlarının doldurulması zorunludur!");
            } else {
                console.dir(err);
                await this.showAlert("Hata", err.message);
            }
        }
    }

    async showAlert(header: string, message: string) {
        const alert = await this.alertControl.create({
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
