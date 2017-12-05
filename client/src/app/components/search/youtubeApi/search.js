// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.


var OAUTH2_CLIENT_ID = '760102447470-m5qua4nr903r5qo31nelrrh45phgftql.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
window["googleApiClientReady"] = function () {
  gapi.auth.init(function () {
    window.setTimeout(checkAuth, 100);
  });
}

// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', null);
}

// Sesrch for a specific video
function search() {
  var resultsArr = [];
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    maxResults: 6,
    part: 'snippet'
  });

  return new Promise(function (resolve, reject) {
    request.execute(function (response) {
      var results = response.result
      for (var i = 0; i < results.items.length; i++) {
        resultsArr.push(results.items[i].id.videoId)
      }
      return resolve(resultsArr)
    });
  })
}

function showId() {
  return new Promise(function(resolve, reject){
  $('.addToPlaylist').click(function (event) {
    selectedVid = $(event.target).prev('iframe')
    let video = selectedVid[0].src
    $.post({
      url: 'http://localhost:8080/video/',
      method: "POST",
      data: video,
      // contentType: "application/json"
    })
    return resolve(video)
    
  })
  
})
}


// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function () {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
      }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function () {
    handleAPILoaded();
  });
}
