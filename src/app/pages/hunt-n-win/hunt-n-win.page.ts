import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { createAnimation, IonContent, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { GameQuizPage } from 'src/app/modal/game-quiz/game-quiz.page';
import { GameService } from 'src/app/services/game/game.service';
import { MapService } from 'src/app/services/map/map.service';
import { DrawerState } from 'ion-bottom-drawer';
import { async } from '@angular/core/testing';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
import { Content } from '@angular/compiler/src/render3/r3_ast';

declare var google;

@Component({
  selector: 'app-hunt-n-win',
  templateUrl: './hunt-n-win.page.html',
  styleUrls: ['./hunt-n-win.page.scss'],
})
export class HuntNWinPage implements AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapElement;
  @ViewChild('scrollDiv') scroll_div: ElementRef;
  shouldBounce = true;
  dockedHeight = 90;
  distanceTop = 300;
  drawerState = DrawerState.Bottom;
  states = DrawerState;
  minimumHeight = 0;
  disableDrag = false


  title: any;
  content: any;

  map: any;
  points = 0
  id: any

  content_venue: any;

  game_completion: any;

  character = google.maps.Marker;
  // the 6 schools
  iit = new google.maps.Marker;
  asc = new google.maps.Marker;
  hss = new google.maps.Marker;
  bus = new google.maps.Marker;
  des = new google.maps.Marker;
  eng = new google.maps.Marker;

  // the non-schools and stories
  library = new google.maps.Marker;
  macSub = new google.maps.Marker;
  bedokRes = new google.maps.Marker;
  gcv = new google.maps.Marker;
  foyerRamp = new google.maps.Marker;
  roundAbt = new google.maps.Marker
  triangleGarden = new google.maps.Marker;
  horseShoe = new google.maps.Marker;


  quiz_pop_up = false;
  control_click_map_icon = false;
  // what else? quiz

  constructor(
    private mapSer: MapService,
    private mapGame: GameService,
    private modalController: ModalController,
    private toast: ToastService,
    private changeRef: ChangeDetectorRef,
  ) {
    this.id = firebase.auth().currentUser.uid
  }

  async ngAfterViewInit() {
    this.toast.presentLoading(null);
    try {
      const db = firebase.database().ref('users').child(this.id);
      const content = firebase.database().ref('content_venue')
      const snapshot = await db.once('value');
      const content_data = await content.once('value');
      this.game_completion = snapshot.val().game;
      this.points = snapshot.val().points;
      this.content_venue = content_data.val();
      this.renderMap();
    } catch (er) {
      console.log(er)
      this.toast.errorToast(null);
    }
  }

  async refreshPoints() {
    const db = firebase.database().ref('users').child(this.id);
    const snapshot = await db.once('value');
    this.points = snapshot.val().points
  }

  renderMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapGame.map_options);

    var mypos = { lat: 1.346584, lng: 103.932869 }
    // character icon
    var icon = {
      url: this.mapGame.checkCharacter(2),
      scaledSize: new google.maps.Size(50, 50),
    }
    this.character = new google.maps.Marker({
      position: mypos,
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      icon: icon
    })
    this.character.addListener("click", () => {
      if (this.character.getAnimation() !== null) {
        this.character.setAnimation(null)
      } else {
        this.character.setAnimation(google.maps.Animation.BOUNCE)
      }
    }) // add clickable character
    this.refresh() // refresh / initialize
    this.toast.stopLoading();
  }


  refresh() {
    console.log(this.game_completion)
    this.setIIT(this.game_completion.find(x => x.venue == "informatics"))
    this.setASC(this.game_completion.find(x => x.venue == "science"))
    this.setHSS(this.game_completion.find(x => x.venue == "humanities"))
    this.setBUS(this.game_completion.find(x => x.venue == "business"))
    this.setDES(this.game_completion.find(x => x.venue == "design"))
    this.setENG(this.game_completion.find(x => x.venue == "engineering"))
    this.setLib(this.game_completion.find(x => x.venue == "library"))
    this.setMacSub(this.game_completion.find(x => x.venue == "macsub"))
    this.setBedokRes(this.game_completion.find(x => x.venue == "bedokres"))
    this.setGCV(this.game_completion.find(x => x.venue == "gcv"))
    this.setFoyerRamp(this.game_completion.find(x => x.venue == "foyerramp"))
    this.setRoundAbt(this.game_completion.find(x => x.venue == "roundabt"))
    this.setTriangleGard(this.game_completion.find(x => x.venue == "triangulargarden"))
    this.setHorseShoe(this.game_completion.find(x => x.venue == "horseshoe"))
    // set venue marker
  }


  setIIT(venue) {
    this.iit.setMap(null)
    this.iit = new google.maps.Marker({
      position: { lat: 1.345420, lng: 103.934081 },
      icon: venue.completed ? this.mapGame.ICONS.informatics : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.iit.addListener("click", () => {

      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("informatics");
        this.animatedMove(this.character, { lat: 1.345546, lng: 103.934116 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.345546, lng: 103.934116 })

      }
    });
  }

  setASC(venue) {
    console.log(venue)
    this.asc.setMap(null)
    this.asc = new google.maps.Marker({
      position: { lat: 1.345523, lng: 103.933589 },
      icon: venue.completed ? this.mapGame.ICONS.science : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.asc.addListener("click", () => {
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("science");
        this.animatedMove(this.character, { lat: 1.345628, lng: 103.933626 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.345628, lng: 103.933626 })
      }
    });
  }

  setHSS(venue) {
    console.log(venue)
    this.hss.setMap(null)
    this.hss = new google.maps.Marker({
      position: { lat: 1.345011, lng: 103.935109 },
      icon: venue.completed ? this.mapGame.ICONS.humanities : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.hss.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("humanities");
        this.animatedMove(this.character, { lat: 1.345118, lng: 103.935122 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.345118, lng: 103.935122 })
      }
    });
  }


  setBUS(venue) {
    console.log(venue)
    this.bus.setMap(null)
    this.bus = new google.maps.Marker({
      position: { lat: 1.344464, lng: 103.933255 },
      icon: venue.completed ? this.mapGame.ICONS.business : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.bus.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("business");
        this.animatedMove(this.character, { lat: 1.344606, lng: 103.933210 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.344606, lng: 103.933210 })
      }
    });
  }

  setDES(venue) {
    console.log(venue)
    this.des.setMap(null)
    this.des = new google.maps.Marker({
      position: { lat: 1.345351, lng: 103.931821 },
      icon: venue.completed ? this.mapGame.ICONS.design : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.des.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("design");
        this.animatedMove(this.character, { lat: 1.345437, lng: 103.931821 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.345437, lng: 103.931821 })
      }
    });
  }

  setENG(venue) {
    console.log(venue)
    this.eng.setMap(null)
    this.eng = new google.maps.Marker({
      position: { lat: 1.346666, lng: 103.931242 },
      icon: venue.completed ? this.mapGame.ICONS.engineering : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.eng.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("engineering");
        this.animatedMove(this.character, { lat: 1.346793, lng: 103.931242 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.346793, lng: 103.931242 })
      }
    });
  }

  setLib(venue) {
    this.library.setMap(null)
    this.library = new google.maps.Marker({
      position: { lat: 1.344984, lng: 103.932620 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.library : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.library.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("library");
        this.animatedMove(this.character, { lat: 1.345068, lng: 103.932622 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.345068, lng: 103.932622 })
      }
    });
  }

  setMacSub(venue) {
    this.macSub.setMap(null)
    this.macSub = new google.maps.Marker({
      position: { lat: 1.344553, lng: 103.932338 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.macsub : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.macSub.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("macsub");
        this.animatedMove(this.character, { lat: 1.344612, lng: 103.932340 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.344612, lng: 103.932340 })
      }
    });
  }

  setBedokRes(venue) {
    this.bedokRes.setMap(null)
    this.bedokRes = new google.maps.Marker({
      position: { lat: 1.342477, lng: 103.930886 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.bedokres : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.bedokRes.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("bedokres");
        this.animatedMove(this.character, { lat: 1.342638, lng: 103.930876 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.342638, lng: 103.930876 })
      }
    });
  }

  setGCV(venue) {
    this.gcv.setMap(null)
    this.gcv = new google.maps.Marker({
      position: { lat: 1.347858, lng: 103.928852 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.gcv : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.gcv.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("gcv");
        this.animatedMove(this.character, { lat: 1.348039, lng: 103.928833 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.348039, lng: 103.928833 })
      }
    });
  }


  setFoyerRamp(venue) {
    this.foyerRamp.setMap(null)
    this.foyerRamp = new google.maps.Marker({
      position: { lat: 1.3459070546045173, lng: 103.93284470550378 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.foyerramp : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.foyerRamp.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked;
        this.changeContent("foyerramp");
        this.animatedMove(this.character, { lat: 1.3460357651116783, lng: 103.93286884538514 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.3460357651116783, lng: 103.93286884538514 })
      }
    });
  }

  setRoundAbt(venue) {
    this.roundAbt.setMap(null)
    this.roundAbt = new google.maps.Marker({
      position: { lat: 1.3462449196713178, lng: 103.93313170187095 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.roundabt : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.roundAbt.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("roundabt");
        this.animatedMove(this.character, { lat: 1.3463977633766284, lng: 103.93312633745288 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.3463977633766284, lng: 103.93312633745288 })
      }
    });
  }

  setTriangleGard(venue) {
    this.triangleGarden.setMap(null)
    this.triangleGarden = new google.maps.Marker({
      position: { lat: 1.3445126903166813, lng: 103.93147946111273 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.triangulargarden : this.mapGame.INCOMPLETE,
      map: this.map
    })
    this.triangleGarden.addListener("click", () => {
      // console.log(complete)
      if (venue.completed) {
        this.drawerState = DrawerState.Docked
        this.changeContent("triangulargarden");
        this.animatedMove(this.character, { lat: 1.3446145861936376, lng: 103.93150896541215 })
      } else {
        this.popQuiz(venue.venue);
        this.animatedMove(this.character, { lat: 1.3446145861936376, lng: 103.93150896541215 })
      }
    });
  }

  setHorseShoe(venue) {
    this.horseShoe.setMap(null)
    this.horseShoe = new google.maps.Marker({
      position: { lat: 1.3454217086654605, lng: 103.93268109075392 },
      // CHANGED ICON
      icon: venue.completed ? this.mapGame.ICONS.horseshoe : this.mapGame.INCOMPLETE,
      map: this.map
    })

      this.horseShoe.addListener("click", () => {
        if (venue.completed) {
          this.drawerState = DrawerState.Docked;
          this.changeContent("horseshoe");
          this.animatedMove(this.character, { lat: 1.345528967443255, lng: 103.93269450179912 })
        } else {
          this.popQuiz(venue.venue);
          this.animatedMove(this.character, { lat: 1.345528967443255, lng: 103.93269450179912 })
        }
      });

  }


  changeContent(venue) {
    this.scroll_div.nativeElement.style.height = "70%"
    this.changeRef.detectChanges()
    if (venue) {
      this.content = this.content_venue.find(x => x.venue == venue)
      setTimeout(() => {
        this.scroll_div.nativeElement.style.height = "1000px"
        this.changeRef.detectChanges()
      }, 300);
    }
  }


  animatedMove(marker, moveto) {
    


    if (!this.control_click_map_icon) {
      this.control_click_map_icon = true

      var deltalat = (moveto.lat - this.character.getPosition().lat()) / 100;
      var deltalng = (moveto.lng - this.character.getPosition().lng()) / 100;
  
      var delay = 10 * 0.5;
      for (var i = 0; i < 100; i++) {
        (function (ind) {
          setTimeout(
            function () {
              var lat = marker.position.lat();
              var lng = marker.position.lng();
              lat += deltalat;
              lng += deltalng;
              let latlng = new google.maps.LatLng(lat, lng);
              marker.setPosition(latlng);
            }, delay * ind
          );
        })(i)
       
      }
      setTimeout(() => {
        this.control_click_map_icon = false
      },1400)
    }
  }

  popQuiz(venue) {

    this.drawerState = DrawerState.Bottom;

    if (!this.quiz_pop_up) {
      this.quiz_pop_up = true
      setTimeout(async () => {
        const modal = await this.modalController.create({
          component: GameQuizPage,
          cssClass: 'my-custom-class',
          componentProps: {
            place: venue
          }
        });

        modal.onDidDismiss()
          .then((data) => {
            this.quiz_pop_up = false
            const onReturn = data['data'];
            if (onReturn) {
              this.updatePoints(onReturn.points, onReturn.place)
            }
          })

        return await modal.present()
      }, 1300)
    }

  }

  updatePoints(points, place) {
    this.game_completion.map((e) => {
      if (e.venue == place) {
        this.content = this.content_venue.find(x => x.venue == place)
        this.showToast(this.content.title, points)
        this.drawerState = DrawerState.Docked
        // this.animate()
        e.completed = true // alter to true
      }
    })
    const newPoints = this.points + points
    // console.log(newPoints)
    firebase.database().ref('users').child(this.id).update({ points: newPoints, game: this.game_completion }).then((s) => {
      this.refreshPoints()
      this.refresh()
    }).catch(er => {
      console.log(er)
    })
  }


  // animate() {
  //   const animation = createAnimation()
  //     .addElement(document.querySelector('.ani'))
  //     .beforeStyles({
  //       display: 'block'
  //     })
  //     .delay(1300)
  //     .duration(300)
  //     .fromTo('opacity', '1', '0')
  //     .afterStyles({
  //       display: "none"
  //     })
  //   animation.play()

  // }

  showToast(ven, points) {
    this.toast.presentToastWithOptions(ven, points)
  }


  // pop up revelead school/venue
}
