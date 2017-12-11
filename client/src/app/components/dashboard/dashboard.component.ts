import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

username;
email;
videoArray;
video;

  constructor(
    private authService: AuthService, public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.email = profile.user.email;
      this.videoArray = profile.user.videoArray
      // this.video = this.sanitizer.bypassSecurityTrustUrl(this.videoArray)
      // console.log(this.videoArray)
    })
  }

  

}
