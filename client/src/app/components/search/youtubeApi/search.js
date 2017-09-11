// After the API loads, call a function to enable the search box.
<<<<<<< HEAD
 function handleAPILoaded() {
    $('#search-button').attr('disabled', false);
  }
  
  // Search for a specified string.
   function search() {
    var q = $('#query').val();
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet'
    });
  
    request.execute(function(response) {
      var str = JSON.stringify(response.result);
      $('#search-container').html('<pre>' + str + '</pre>');
    });
  }
=======
function handleAPILoaded() {
	$('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
	var q = $('#query').val();
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet'
	});

	request.execute(function (response) {
		var str = JSON.stringify(response.result);
		$('#search-container').html('<pre>' + str + '</pre>');
	});
}
>>>>>>> d41e780617304001e56949dd63c41f7571393b96
