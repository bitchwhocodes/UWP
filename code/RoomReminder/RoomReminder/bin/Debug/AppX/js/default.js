// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var nav = WinJS.Navigation;
	var activation = Windows.ApplicationModel.Activation;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			function navigating(eventObject) {
			    var url = eventObject.detail.location;
			    var host = document.getElementById("holder");
			    if (host.winControl) {

			        host.winControl.unload && host.winControl.unload();
			        host.winControl.dispose && host.winControl.dispose();

			    }

			    WinJS.Utilities.disposeSubTree(host);
			    WinJS.Utilities.empty(host);
			   
			    var p = WinJS.UI.Pages.render(url, host, eventObject.detail.state).
                then(function () {
                    console.log("we can capture when its done");
                })
			    p.done();
			    eventObject.detail.setPromise(p);
			}

			nav.addEventListener("navigating", navigating);
			nav.navigate("/html/home.html", "home");
		
			args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	
	
	app.start();
})();
