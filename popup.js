window.onload = connect();

function connect() {
	document.getElementById("connect").addEventListener("click", () => {
		let check = null;
		let outputBox = document.getElementById("connection_message");
		let serverIP = document.getElementById("serverValue").value;
		let serverPort = document.getElementById("portValue").value;
		if (serverIP == null) {
			outputBox.innerHTML += "error: no serverIP"
		}
		else if (serverPort == null) {
			outputBox.innerHTML += "error: no serverPort"
		}
		else {
			var xhr = createCORSRequest("GET", `http://${serverIP}:${serverPort}/check`);
			xhr.onload = function() {
				var check = xhr.responseText;
				if(check == null) {
					outputBox.innerHTML = "cannot connect to server";
					//todo: not activate
					//todo:change logic
					//todo: timeout
				}
				else {
					outputBox.innerHTML = "connected";
					connected = true;
					document.getElementById("connect").value = "disconnect";
					informMain(`${serverIP}:${serverPort}`);
					//todo: disconnect		
				}
			};
			xhr.send();
			outputBox.innerHTML = "connecting";
		}


	});	
}

function createCORSRequest(method, url) {
	//credit for https://www.html5rocks.com/en/tutorials/cors/#toc-adding-cors-support-to-the-server
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
		xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
		xhr = new XDomainRequest();
		xhr.open(method, url);
	} else {
		xhr = null;
	}
	return xhr;
}

function informMain(url) {
	var port = chrome.extension.connect({
		name: "to_Main"
	});
 	port.postMessage(url);
}