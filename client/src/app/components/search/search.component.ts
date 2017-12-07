import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

declare var search: any;
declare var showId: any;
declare var gapi: any;


@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
	
	username;
	id;
	videos;
	url;
	urls = [];
	videoSrc;
	
	
	
	private _apiInterval: any;
	
	constructor(private authService: AuthService,public sanitizer: DomSanitizer) {}

	ngOnInit() {
		this._apiInterval = setInterval(() => {
			if (typeof gapi !== "undefined" && gapi.auth && gapi.auth.init) {
				clearInterval(this._apiInterval);
				// googleApiClientReady();
			}
		}, 100);
		this.authService.getProfile().subscribe(profile => {
			this.username = profile.user.username;
			this.id = profile.user._id
			return this.id
			// console.log(this.id, this.videoSrc)
		  })
		}
	find(){
		search().then((result) =>{
			this.videos = result;
			for (var i=0; i<this.videos.length; i++){
				this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.videos[i])
				this.urls.push(this.url)
			}
			return this.urls;
		})
	}

	idShow(){
		showId().then(function(result){
			var videoSrc = result;
				console.log(this.id)
				return videoSrc;
			});
		
	}
}
	

			
// 			jQuery('.addToPlaylist').click(function(event){
// 				selectedVid = $(event.target).prev('iframe')
// 				let video = selectedVid[0].src
// 				// console.log(selectedVid[0].src);
// 				console.log()
// 				jQuery.post({
// 					url: 'http://localhost:8080/video/',
// 					method: "POST",
// 					data: video,
// 					// contentType: "application/json"
// 				})				
// 			})
// 		});

