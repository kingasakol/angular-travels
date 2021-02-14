import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Travel } from '../travel/travel';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TravelService {
  collectionName = 'travels';

  daneRef: AngularFirestoreCollection<Travel>;
  
  constructor(private db: AngularFirestore, private http: HttpClient) {
    this.daneRef = db.collection(this.collectionName);
  }

  createTravel(travel: Travel): void {
    this.daneRef.add({...travel});
  }

  updateTravel(key: string, value: any) {
    this.daneRef.doc(key).update(value);
  }

  deleteTravel(key: string) {
   this.daneRef.doc(key).delete();
  }

  getTravelsList()  {
    return this.daneRef;
  }

  deleteAll() {
    this.daneRef.get().subscribe(
      query => query.forEach((doc) => {
        doc.ref.delete();
      })
     );
   }
    
}
