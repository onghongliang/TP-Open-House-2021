import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ccalist',
  templateUrl: './ccalist.page.html',
  styleUrls: ['./ccalist.page.scss'],
})
export class CcalistPage implements OnInit {
  arts = {type: 'Arts & Culture'}
  sports = {type: 'Sports'}
  clubs = {type: 'P10 Clubs'}
  ints = {type: 'Interest Groups'}


  constructor(private router: Router,) { }

  ngOnInit() {
  }
  openArts() { this.router.navigate(['/categorycca'], {queryParams: this.arts,}); }
  openSports() { this.router.navigate(['/categorycca'], {queryParams: this.sports,}); }
  openClubs() { this.router.navigate(['/categorycca'], {queryParams: this.clubs,}); }
  openInterests() { this.router.navigate(['/categorycca'], {queryParams: this.ints,}); }
}
