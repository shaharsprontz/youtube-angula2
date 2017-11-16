import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

username;
email;
video;  

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.authService.getProfile().subscribe(profile => {
    //   this.username = profile.user.username;
    //   this.email = profile.user.email;
    //   // this.video = profile.user.videoArray
    // })
  }

  

}
