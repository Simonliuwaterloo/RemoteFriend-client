chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(url) {
           console.log("message recieved" + url);
           transferRequest(url);
      });
})

function transferRequest(url) {
	console.log("yeah");
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			console.log(details);
			return {redirectUrl: url};
		},
		{
		    urls: ['<all_urls>'], // or <all_urls>
		    types: ['main_frame', 'sub_frame'],
		},
		["blocking"]
	);
}

