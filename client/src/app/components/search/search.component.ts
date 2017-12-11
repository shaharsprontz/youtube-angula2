import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '../../services/search.service';
import { Http, Response } from '@angular/http';

declare var search: any;
declare var showId: any;
declare var gapi: any;


@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css'],
	providers: [SearchService]
	
})

export class SearchComponent implements OnInit {
	
	username;
	id;
	videos;
	url;
	urls = [];
	selectedVid
	result;
	http;
	// videoSrc;
	
	private _apiInterval: any;
	
	constructor(private authService: AuthService, private searchService: SearchService, public sanitizer: DomSanitizer, http: Http) {}

	ngOnInit() {
		this._apiInterval = setInterval(() => {
			if (typeof gapi !== "undefined" && gapi.auth && gapi.auth.init) {
				clearInterval(this._apiInterval);
				this.searchService.googleApiClientReady()
			}
		}, 100);
		// this.authService.getProfile().subscribe(profile => {
		// 	this.username = profile.user.username;
		// 	this.id = profile.user._id
		// 	console.log(this.id)			
		// 	return this.id
		//   })
		}
		find(){
			this.urls = [];
			this.searchService.search().then((result) =>{
				this.videos = result;
				for (var i=0; i<this.videos.length; i++){
					this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.videos[i])
					this.urls.push(this.url)
				}
				console.log(this.urls)
				return this.urls;
			})
		}
		saveVideoToDb(){
			// console.log(this.id)	
			this.authService.getProfile().subscribe(profile => {
			let user = {
				id: profile.user._id
			}
			this.searchService.saveVid(user).then(function(result){
			console.log(result);
			})
			// this.authService.saveVidToDb(user).subscribe(data => {
			// 	console.log(data)
			// })
				
			
			// this.authService.saveVidToDb()
			// .then(function(result){
			// 	var selectedVid = result;	
			// 	console.log(selectedVid)
			// })	
			// return [this.selectedVid, this.id];	
		  })
			

				
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

