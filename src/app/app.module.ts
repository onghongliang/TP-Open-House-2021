import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import * as firebase from 'firebase'; // firebase import
import { environment } from '../environments/environment'; // import env
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';


import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AnalyticsFirebase } from '@ionic-native/analytics-firebase/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Base64 } from '@ionic-native/base64/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { DevInfoPageModule } from './modal/dev-info/dev-info.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TourPopComponent } from './components/tour-pop/tour-pop.component';
// import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AES256 } from '@ionic-native/aes-256/ngx';
import { GameQuizPageModule } from './modal/game-quiz/game-quiz.module';

import { IonBottomDrawerModule } from 'ion-bottom-drawer';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { ChangeInfoPageModule } from './pages/profile/change-info/change-info.module';
import { ScheduleModalPageModule } from './pages/schedule/schedule-modal/schedule-modal.module';
import { FilterSchedulePageModule } from './pages/schedule/filter-schedule/filter-schedule.module';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot({
      mode: 'md'
    }),
    IonicStorageModule.forRoot(),
    AngularFireAuthModule,
    BrowserModule, 
    DevInfoPageModule,
    BrowserAnimationsModule,
    GameQuizPageModule,
    IonBottomDrawerModule,
    IonicHeaderParallaxModule,
    ChangeInfoPageModule,
    ScheduleModalPageModule,
    FilterSchedulePageModule
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    OneSignal, // notification
    InAppBrowser, // in app browser
    PhotoViewer,
    AppLauncher,
    EmailComposer,
    AppAvailability,
    Device,
    Geolocation,
    NativeGeocoder,
    AnalyticsFirebase,
    // GooglePlus,
    AES256,
    Clipboard,
    Camera,
    Crop,
    Base64,
    AppRate ,
  
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
