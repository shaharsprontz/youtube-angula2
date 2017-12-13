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
videosToDisplay = [];

  constructor(
    private authService: AuthService, public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    var re = /[*]/g
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username;
      this.videoArray = profile.user.videoArray;
      for (var i=0; i<this.videoArray.length;i++){
        var proccessedVidSrc = Object.keys(this.videoArray[i])
        for (var j=0;j<proccessedVidSrc.length;j++){
          var pross = proccessedVidSrc[j]
          var newString = pross.replace(re, '.')
          this.videosToDisplay.push(newString);          
        }
      }
    })    
  }

  

}
