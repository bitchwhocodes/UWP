(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("html/add.html", {
        ready: function (element, options) {
            console.log("Add page ready");
            savebutton.addEventListener("click", transitionBetweenPages, false);
            returnbutton.addEventListener("click", returnHome, false);
        }
    })

    function transitionBetweenPages(obj) {
       
    }
    function returnHome(obj)
    {
        WinJS.Navigation.navigate("/html/home.html", "add");
    }
})();