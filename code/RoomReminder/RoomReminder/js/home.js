(function () {
    "use strict";
    
    var page = WinJS.UI.Pages.define("/html/home.html", {
        ready: function (element, options) {
            addbutton.addEventListener("click", transitionBetweenPages, false);
            allbutton.addEventListener("click", transitionBetweenPages, false);
        },
        unload: function ()
        {
            console.log("Home Page is Unloading")
        }
    });


    function transitionBetweenPages(obj)
    {
        var id = obj.currentTarget.id;
        var url = (id == "allbutton") ? "/html/list.html" : "/html/add.html";
        WinJS.UI.Animation.exitPage(homepage, null).done(
            function () {
                WinJS.Navigation.navigate(url);
            }
       )
       
      
    }

})();