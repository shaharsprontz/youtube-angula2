import { Injectable } from '@angular/core';
import { HttpModule, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


declare var gapi: any;

const OAUTH2_CLIENT_ID = '760102447470-m5qua4nr903r5qo31nelrrh45phgftql.apps.googleusercontent.com';
const	OAUTH2_SCOPES = 'https://www.googleapis.com/auth/youtube';

@Injectable()
export class SearchService {
  constructor(public http: Http, private authService: AuthService) {}

// Upon loading, the Google APIs JS client automatically invokes this callback.
public googleApiClientReady = () => {
	gapi.auth.init(() => {
	  window.setTimeout(this.checkAuth.bind(this), 100);
	});
  }

// After the API loads, call a function to enable the search box.
private handleAPILoaded() {
  $('#search-button').attr('disabled', null); 
}

// Sesrch for a specific video
search() {
var resultsArr = [];    
	var q = $('#query').val();
	var request = gapi.client.youtube.search.list({
	q: q,
	maxResults: 6,
	part: 'snippet'
	});
	return new Promise((resolve, reject) => {
	request.execute(function (response) {
		var results = response.result
		for (var i = 0; i < results.items.length; i++) {
		resultsArr.push(results.items[i].id.videoId)
		}
		return resolve(resultsArr)
	});   
	})
}

saveVid() {
  return new Promise((resolve, reject) => {
  $(document).on('click', '.addToPlaylist', function (event) {
		var selectedVid = $(event.target).prev('iframe').attr('src');
		$(this).attr('disabled', 'disabled').text('Added');
	  return resolve(selectedVid)  	
	  })
	})
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
    $('.pre-auth').hide();
    $('.post-auth').show();
    this.loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    
	$('#login-link').click(() => {
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
  return new Promise(function(resolve, reject){
    gapi.client.load('youtube', 'v3', () => {})
    return resolve()
  }).then(this.handleAPILoaded)
}

}


