import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Term from '../models/term';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = 'terms';
  termsRef: AngularFirestoreCollection<Term> = null;

  constructor(private db: AngularFirestore) {
    this.termsRef = db.collection(this.dbPath);
  }

  getTerm(TermKey){
    return this.termsRef.doc(TermKey).snapshotChanges();
  }

  updateTerm(termKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.termsRef.doc(termKey).set(value);
  }

  deleteTerm(termKey){
    return this.termsRef.doc(termKey).delete();
  }

  //method to sort terms by alphabetical order before displaying them on the Home page
  getTerms(){
    return this.db.collection('terms', ref => ref.orderBy('name')).snapshotChanges();
  }

  searchTerms(searchValue){
    return this.db.collection('terms',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  createTerm(value){
    return this.db.collection('terms').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      acronymMeaning: value.acronymMeaning,
      definition: value.definition,
      path: "",
      downloadURL:  ""
    });
  }

}