import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Basket } from '../basket/basket';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BasketService {
  collectionName = 'basket';

  daneRef: AngularFirestoreCollection<Basket>;

  bookedTravel = new Array();
  
  constructor(private db: AngularFirestore, private http: HttpClient) {
    this.daneRef = db.collection(this.collectionName);
  }

  createBasketItem(basket: Basket): void {
    this.daneRef.add({...basket});
  }

  deleteBasketItem(key: string) {
    let i = 0;
    let keyToDelete:string;
    this.daneRef.ref.where("travelUid", "==", key).onSnapshot(snap => {
      snap.forEach(basketRef =>{
        if(i == 0){
          keyToDelete = basketRef.id;
          this.daneRef.doc(keyToDelete).delete();
          i++;
        }
      })
    });
  }

  getBasketList()  {
    return this.daneRef;
  }

  getBookedTravelList(email: string){
    var listForFilter = new Array();
    this.daneRef.ref.where("email", "==", email).onSnapshot(snap => {
      snap.forEach(basketRef => {
        listForFilter.push(basketRef.data().travelUid);
      });
    })
    
    return listForFilter;
  }

  deleteAll() {
    this.daneRef.get().subscribe(
      query => query.forEach((doc) => {
        doc.ref.delete();
      })
     );
  }
    
}
