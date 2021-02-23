import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  collectionName = 'users';
  daneRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) { 
    this.daneRef = db.collection(this.collectionName);
  }

  getUsersList(){
    return this.daneRef;
  }

  updateRole(key: string, value: any){
    this.daneRef.doc(key).update(value);
  }
  
}
