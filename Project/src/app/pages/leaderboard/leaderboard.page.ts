import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { IonSlides } from '@ionic/angular';
import * as firebase from 'firebase';
import { link } from 'fs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  @ViewChild('slides', { static: true }) slider: IonSlides;
  id
  leaderBoard: any = []
  segmentModel = "school";
  segment = 0
  topInd: any = []
  topSchl: any = []

  position: 0;
  yourscore: any;
  schlPosition: any;
  yourschool: any;

  numberofInd: any;
  numberofSchl: any;
  constructor(private changeRef: ChangeDetectorRef) {
  
    this.id = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    console.log(this.id + "  dsd")
    firebase.database().ref("users").on('value', (data) => {
      
      const global = snapshotToArray(data) // retrieve main data
      var storage = firebase.storage()
      // var linkk = storage.ref('/p2pZmaqueFMtq6xlJOU38N6h2cB2').getDownloadURL()

      // console.log(linkk)
      const pp: any = global.filter(p => { // only show those who played, 
        if (p.points > 0) {
          storage.ref().child(p.uid).getDownloadURL().then(e => {
            p.uid = e
          }).catch(e => {
            p.uid = null
          })
          return p
        }     // more than 0 points means user played
      })


      // TOP INDIVIDUAL
      pp.sort((a, b) => { // sort data from highest to lowest
        return b.points - a.points;
      })
      console.log(pp)
      this.numberofInd = pp.length

      this.position = pp.findIndex((d) => {
        if (d.uid === this.id) {
          this.yourscore = d
          return d
        }
      })


      this.topInd = pp.slice(0, 10)

      let uniqueschool = pp.map(item => item.school)  // take unique school from global
        .filter((value, index, self) => {
          if (value !== undefined) {
            return self.indexOf(value) === index
          }
        })

      // return school name array in object with points initialized
      const listSchool = uniqueschool.map(e => { return { school: e, points: 0 } });
      // Calculate top school points
      pp.map(e => {
        listSchool.map(s => {
          if (e.school == s.school) {
            s.points += e.points
          }
        })
      })

      // sort school from highest to lowest
      listSchool.sort((a, b) => {
        return b.points - a.points;
      })

      this.numberofSchl = listSchool.length

      if (this.yourscore && this.yourscore.school) {
        this.schlPosition = listSchool.findIndex((d) => {
          if (this.yourscore.school == d.school) {
            this.yourschool = d
            return d
          }
        })
      } else {
        this.schlPosition = -1
        this.yourschool = null

      }

      this.topSchl = listSchool.slice(0, 10)

      this.changeRef.detectChanges();
    })

  }

  ngOnInit() {
    this.slider.slideTo(0);
    this.changeRef.detectChanges();
  }


  async segmentChanged(event) {
    console.log(this.segmentModel);
    console.log(event);
    await this.slider.slideTo(this.segment)
    this.changeRef.detectChanges();
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    this.changeRef.detectChanges();
  }
  async getUrl(link) {
    var storage = await firebase.storage().ref(`${link}.jpg`);
    if (link) {
      this.changeRef.detectChanges();
      return storage.getDownloadURL()
    }
    
    return null;
  }
}



export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });
  return returnArr;
}



