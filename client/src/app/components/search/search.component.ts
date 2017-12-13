import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '../../services/search.service';
import { Http, Response, Headers } from '@angular/http';

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
	result;
	token;
	user;
	
	private _apiInterval: any;
	
	constructor(private authService: AuthService, private searchService: SearchService, public sanitizer: DomSanitizer,private http: Http) {}

	ngOnInit() {
		this._apiInterval = setInterval(() => {
			if (typeof gapi !== "undefined" && gapi.auth && gapi.auth.init) {
				clearInterval(this._apiInterval);
				this.searchService.googleApiClientReady()
			}
		}, 100);
		this.user = this.authService.user;
		this.token = this.authService.options.headers.get("authorization");
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
			// return this.urls;
		})
	}
	getVideoSrc(){
		this.searchService.saveVid().then((result => {
			var preProcessed = result.toString().split('.').join('*')
			this.saveToDb(preProcessed)
		}))
	}
	private saveToDb(preProcessed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		headers.append('authorization', this.token)
		
		this.http.post('http://localhost:8080/authentication/search', preProcessed, {headers: headers})
		.subscribe(data => {
			console.log('ok');
		}, error => {
			console.log(JSON.stringify(error.json()));
		})
	}
	
}		
			
		

			

				
		
	
