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
        if (id == "addbutton")
        {
            WinJS.Navigation.navigate("/html/add.html", "home");
        }
       
      
    }

})();