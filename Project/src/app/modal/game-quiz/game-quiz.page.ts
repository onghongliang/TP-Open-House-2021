import {  Component, ViewChild, } from '@angular/core';
import {IonSlides, ModalController, NavParams, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ToastService } from 'src/app/services/toast-alert/toast.service';
@Component({
  selector: 'app-game-quiz',
  templateUrl: './game-quiz.page.html',
  styleUrls: ['./game-quiz.page.scss'],
})
export class GameQuizPage  {
  @ViewChild('slides', { static: false }) slider: IonSlides;
  viewSlide = false;
  points = 40;

  questions: any = []
  question = ""
  selected = "";
  answer = "";
  count = 3;

  aniWrong = false;
  aniCorrect = false
  aniSerious = false;

  venue = ''

  funfact: any = {};

  constructor(
    private modalController: ModalController,
    public toastController: ToastController,
    private navParams: NavParams,
    private toast: ToastService

  ) {
    this.venue = this.navParams.get('place')
  }

  ionViewWillEnter() {
    this.viewSlide = true
  }

  async accept() {
    this.toast.presentLoading(null);
    const realtime = firebase.database().ref('quiz/' + this.venue).once('value');
    const funfact = firebase.database().ref('funfacts').once('value');

    await funfact.then(async e => {
      const data = e.val();
      const rand =  Math.floor(Math.random() * data.length);
      this.funfact = data[rand]
      console.log(this.funfact)
    }).catch(e => {
      this.close();
      this.toast.errorToast(null)
      this.toast.stopLoading();
    })

    await realtime.then(async e => {
      var _options = [];
      let response = e;
      await response.forEach(d => {
        let data = d.val()
        _options.push(data)
      });
      const rand = Math.floor(Math.random() * _options.length);
      console.log(rand + " random dsd")
      const rnQuiz = _options[rand]
      this.inputQuestion(rnQuiz)

      this.slider.lockSwipes(false);
      this.slider.slideNext()
      this.slider.lockSwipes(true)
      this.toast.stopLoading()

      setTimeout(() => {
        this.slider.lockSwipes(false);
        this.slider.slideNext()
        this.slider.lockSwipes(true)
      }, 7000)

    }).catch(e => {
      let i = "Something went wrong/quiz not available yet."
      this.toast.errorToast(i)
      this.toast.stopLoading();
      this.close()
    })
  }

  inputQuestion(question) {
    if (question == undefined || question == null) {
      this.close();
      this.toast.errorToast(null)
      this.toast.stopLoading();
    }

    this.questions = shuffle(question.list)
    this.question = question.question
    this.answer = question.answer
    console.log(this.questions)
    this.slider.lockSwipes(true)
  }

  reject() {
    this.close()
  }

  close() {
    this.modalController.dismiss()
  }

  async slideChanged() {
    // this.segment = await this.slider.getActiveIndex();
  }

  radioGroupChange(value) {
    // console.log(value.detail.value);
    this.selected = value.detail.value;
    console.log(this.selected)

  }
  radioSelect(event) {
    console.log(event.detail)
  }

  submit() {
    if (this.selected == this.answer) {
      console.log("correct")
      this.animateCorrect()
    } else {
      this.count -= 1; // number of tries count down
      this.points -= 10;
      this.questions.map(e => {
        if (e.question == this.selected) {
          e.disabled = true
        }
      })

      if (this.count == 0) {
        this.animateSeriously()
      } else {
        this.animateWrong()
      }
      console.log("wrong")
      this.selected = ""
    }
    console.log(this.count)
  }

  animateWrong() {
    this.toast.presentToast("Wrong Answer!")
  }

  animateCorrect() {
    this.toast.presentToast("Correct Answer!")
    setTimeout(() => {
      this.presentToast(this.points)
      this.modalController.dismiss({ place: this.venue, points: this.points })
    }, 2000)
  }

  animateSeriously() {
    this.toast.presentToast("Wrong Answer!")
  }


  async presentToast(points) {
    const toast = await this.toastController.create({
      message: `You have been rewarded ${points} points!`,
      position: "top",
      duration: 2000
    });
    toast.present();
  }

}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
