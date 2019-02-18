chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      port.onMessage.addListener(function(msg) {
           console.log("message recieved" + msg);
           transferRequest();
      });
})

function transferRequest() {
	console.log("yeah");
	chrome.webRequest.onBeforeRequest.addListener(
		function(details) {
			console.log(details);
			return {redirectUrl: "http://192.168.0.26:3000/"};
		},
		{
		    urls: ['<all_urls>'], // or <all_urls>
		    types: ['main_frame', 'sub_frame'],
		},
		["blocking"]
	);
}

