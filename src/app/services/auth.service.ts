import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "./user.model";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

export interface Credentials {
    email: string;
    password: string;
}

@Injectable({providedIn: 'root'})

export class AuthService {
    readonly authState$: Observable<User | null> = this.fireAuth.authState;
    userData: Observable<User>;
    authUser;

    users: Observable<any>;
    user: User;

    daneRef: AngularFirestoreCollection;

    currentUser;

    userStatus: string;

    public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private fireAuth: AngularFireAuth, private db: AngularFirestore){
        this.daneRef = db.collection('users');

        fireAuth.authState.subscribe(auth => {
            if(auth){
                alert("Zalogowano");
                console.log('logged in - zmiana stanu');
                this.db.collection("users").ref.where("email", "==", auth.email).onSnapshot(snap => {
                    snap.forEach(userRef => {
                        this.currentUser = userRef.data();
                        this.setUserStatus(this.currentUser);
                    })
                })
                
            } else {
                alert("Wylogowano");
                console.log("not logged in - zmiana stanu");
                console.log(auth);
            }
            this.authUser = auth;
        });
        this.userData = fireAuth.authState;
        console.log("start");
    }

    login({email, password}: Credentials){
        return this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
            this.db.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap => {
                snap.forEach(userRef => {
                    this.currentUser = userRef.data();
                    this.setUserStatus(this.currentUser);
                })
            })
        });
    }

    register({email, password}: Credentials){
        return this.fireAuth.createUserWithEmailAndPassword(email, password).then((userResponse) => {
            let user = {
                id: userResponse.user.uid,
                email: userResponse.user.email,
                roles: {
                    admin: false,
                    VIP: false,
                    reader: true,
                    pracownik: false
                }
            }
            this.db.collection("users").add(user).then(user => {
                user.get().then(x => {
                    console.log(x.data());
                    this.currentUser = x.data();
                    this.setUserStatus(this.currentUser);
                })
            });
        });
    }

    logout(){
        return this.fireAuth.signOut().then(() => {
            console.log("user signed out");
            this.currentUser = null;
            this.setUserStatus(null);
        });
    }

    changePersistence(option){   
        this.fireAuth.setPersistence(option);
    }

    setUserStatus(userStatus){
        this.userStatus = userStatus;
        this.userStatusChanges.next(userStatus);
    }

    userChanges(){
        this.fireAuth.onAuthStateChanged(currentUser => {
          if(currentUser){
            this.db.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
              snap.forEach(userRef => {
                this.currentUser = userRef.data();
                this.setUserStatus(this.currentUser);
                console.log(this.userStatus)
              })
            })
          } else {
              console.log("nie ma usera");
          }
        })
      }
}