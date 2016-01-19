﻿(function () {
    "use strict";
    
    var page = WinJS.UI.Pages.define("/html/home.html", {
        ready: function (element, options) {
            addbutton.addEventListener("click", transitionBetweenPages, false);
            allbutton.addEventListener("click", transitionBetweenPages, false);
        }
    })

    function transitionBetweenPages(obj)
    {
        var id = obj.currentTarget.id;
        console.log("button selected".id);
    }

})();