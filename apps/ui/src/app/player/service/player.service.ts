import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Player } from '@f2020/data';
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  createPlayer(player: Player): Promise<void> {
    const db = firebase.firestore();
    return db.collection('player').doc(player.uid).set(player);
  }
}
