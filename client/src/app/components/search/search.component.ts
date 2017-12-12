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
	result;
	token;
	user;
	headers;
	
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
		this.headers = this.authService.options.headers;
		this.token = this.authService.options.headers._headers.get("authorization")
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
	getVideoSrc(){
		this.searchService.saveVid().then((result => {
			this.saveToDb(result)
		}))
	}
	private saveToDb(result) {
		debugger
		this.http.post('http://localhost:8080/authentication/search',JSON.stringify({result}),{headers: this.headers})
		.subscribe(data => {
			console.log(data, result)
		})
	}
	
}		
			
		

			

				
		
	
