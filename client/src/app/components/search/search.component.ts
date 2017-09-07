import { Component, OnInit, ElementRef } from '@angular/core';

declare var gapi: any;
declare var jQuery: JQueryStatic;

const OAUTH2_CLIENT_ID = 'AIzaSyDOC-onvBgQkv4NUoelJ9r9CEHDBUGmwng';
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
		jQuery('#search-button').attr('disabled', "false");
	}

	// Search for a specified string.
	private search() {
		var q = jQuery('#query').val();
		var request = gapi.client.youtube.search.list({
			q: q,
			part: 'snippet'
		});

		request.execute(function (response) {
			var str = JSON.stringify(response.result);
			jQuery('#search-container').html('<pre>' + str + '</pre>');
		});
	}

	// The client ID is obtained from the {{ Google Cloud Console }}
	// at {{ https://cloud.google.com/console }}.
	// If you run this code from a server other than http://localhost,
	// you need to register your own client ID.

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
		// gapi.client.setApiKey("AIzaSyDOC-onvBgQkv4NUoelJ9r9CEHDBUGmwng");
		gapi.client.load('youtube', 'v3', () => {
			this.handleAPILoaded();
		});
	}


}
