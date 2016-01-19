

(function () {
    "use strict";
   
   
    var systemNavigationManager = Windows.UI.Core.SystemNavigationManager.getForCurrentView();

    var page = WinJS.UI.Pages.define("html/list.html", {
        ready: function (element, options) {
            systemNavigationManager.addEventListener("backrequested", backRequested);
            systemNavigationManager.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.visible;
        

        
        },
        unload: function () {
            systemNavigationManager.removeEventListener("backrequested", backRequested);
            systemNavigationManager.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.collapsed;

        }
    })

    function backRequested() {
        WinJS.UI.Animation.exitPage(list, null).done(function () {
            WinJS.Navigation.navigate("/html/home.html", "list");
        })
    }

})();