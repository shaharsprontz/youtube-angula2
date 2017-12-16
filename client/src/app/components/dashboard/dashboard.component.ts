import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardService } from 'app/services/dashboard.service';
import { Http, HttpModule, Headers } from '@angular/http';

declare var removeFromDb: any;

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
user;
token;
_ref:any;   

  constructor(
    private authService: AuthService, public sanitizer: DomSanitizer, private dashboardService: DashboardService, private http: Http) { }

  ngOnInit() {
       this.showPlaylist()
  }

  showPlaylist(){
    var re = /[*]/g
    this.authService.getProfile().subscribe(profile => {
      this.user = this.authService.user;
      this.token = this.authService.options.headers.get("authorization");
      this.username = profile.user.username;
      this.videoArray = profile.user.videoArray;
      for (var i=0; i<this.videoArray.length;i++){
          var pross = this.videoArray[i]
          var prossString = pross.toString(pross)
          var newString = prossString.replace(re, '.')
          var safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(newString)
          this.videosToDisplay.push(safeVideoUrl);          
        }
    }) 
}

  deleteFromPlaylist(){
    var re = /[.]/g
    this.dashboardService.removeFromDb().then((result => {
      var resultToString = result.toString();
      var reProccessedString = resultToString.replace(re, '*')
      this.removeFromDataBase(reProccessedString);
    }))
  }

  private removeFromDataBase(videoSrc){
    this.authService.getProfile
    let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('authorization', this.token)
		
		this.http.post('http://localhost:8080/authentication/dashboard', videoSrc, {headers: headers})
		.subscribe(data => {
      console.log('ok');
      // this.showPlaylist();
		}, error => {
			console.log(JSON.stringify(error.json()));
		})
  }

}
