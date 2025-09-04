import { Component, OnInit } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-gettin-there',
  templateUrl: './gettin-there.page.html',
  styleUrls: ['./gettin-there.page.scss'],
})
export class GettinTherePage implements OnInit {

  constructor(
    private photoViewer: PhotoViewer
  ) { }

  ngOnInit() {
  }
  view() {
    let img = "https://www.tp.edu.sg/content/dam/tp-web/files/about-tp/contact-us/location_map.pdf"
    this.photoViewer.show(img, "TP Location Map");
    console.log(img)
  }
}
