import { Component, OnInit, ElementRef } from '@angular/core';

declare var gapi: any;
declare var jQuery: JQueryStatic;

const OAUTH2_CLIENT_ID = '760102447470-m5qua4nr903r5qo31nelrrh45phgftql.apps.googleusercontent.com';
const OAUTH2_SCOPES = [
	'https://www.googleapis.com/auth/youtube'
];

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	private _apiInterval: any;

	constructor(private root: ElementRef) { }

	ngOnInit() {
		this._apiInterval = setInterval(() => {
			if (typeof gapi !== "undefined" && gapi.auth && gapi.auth.init) {
				clearInterval(this._apiInterval);
				this.googleApiClientReady();
			}
		}, 100);
	}
	// After the API loads, call a function to enable the search box.
	handleAPILoaded() {
		jQuery('#search-button').attr('');
	}

	// Search for a specified string.
	private search() {
		var selectedVid;
		var q = jQuery('#query').val();
		var request = gapi.client.youtube.search.list({
			q: q,
			part: 'snippet'
		});
		var resultsArr = [];
		request.execute(function (response) {
			var results = response.result
			for (var i = 0; i < results.items.length; i++) {
				resultsArr.push(results.items[i].id.videoId)
			}
			for (var i = 0; i < resultsArr.length; i++){
				jQuery('#search-container').append('<iframe width="550" height="280" margin="5px" border="4px solid green" src="https://www.youtube.com/embed/'+resultsArr[i]+'" frameborder="5" allowfullscreen></iframe>')
				.append('<button class="addToPlaylist">Add to Playlist</button>')
				jQuery('.addToPlaylist').css({"margin":"0 auto", "margin-bottom": "15px", "display": "block"})

			}
			jQuery('.addToPlaylist').click(function(event){
				selectedVid = $(event.target).prev('iframe')
				let video = selectedVid[0].src
				console.log(selectedVid[0].src);
				jQuery.post({
					url: 'http://localhost:8080/video/',
					method: "POST",
					data: video,
					// contentType: "application/json"
				})				
			})
		});
		jQuery('#search-button').click(function(){
			jQuery('#search-container').empty()
		})
	}


	// Upon loading, the Google APIs JS client automatically invokes this callback.
	private googleApiClientReady = function () {
		gapi.auth.init(() => {
			window.setTimeout(this.checkAuth.bind(this), 1);
		});
	}

	// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
	// If the currently logged-in Google Account has previously authorized
	// the client specified as the OAUTH2_CLIENT_ID, then the authorization
	// succeeds with no user intervention. Otherwise, it fails and the
	// user interface that prompts for authorization needs to display.
	private checkAuth() {
		gapi.auth.authorize({
			client_id: OAUTH2_CLIENT_ID,
			scope: OAUTH2_SCOPES,
			immediate: true
		}, this.handleAuthResult.bind(this));
	}

	// Handle the result of a gapi.auth.authorize() call.
	private handleAuthResult(authResult) {
		if (authResult && !authResult.error) {
			// Authorization was successful. Hide authorization prompts and show
			// content that should be visible after authorization succeeds.
			jQuery('.pre-auth').hide();
			jQuery('.post-auth').show();
			this.loadAPIClientInterfaces();
		} else {
			// Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
			// client flow. The current function is called when that flow completes.
			jQuery('#login-link').click(() => {
				gapi.auth.authorize({
					client_id: OAUTH2_CLIENT_ID,
					scope: OAUTH2_SCOPES,
					immediate: false
				}, this.handleAuthResult.bind(this));
			});
		}
	}

	// Load the client interfaces for the YouTube Analytics and Data APIs, which
	// are required to use the Google APIs JS client. More info is available at
	// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
	private loadAPIClientInterfaces() {
		gapi.client.load('youtube', 'v3', () => {
			this.handleAPILoaded();
		});
	}


}
