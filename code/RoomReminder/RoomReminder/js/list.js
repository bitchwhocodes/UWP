

(function () {
    "use strict";
    var items = [{ "number": "2340", "from": "03/23/2015" }, { "number": "4456", "from": "03/21/2015" }, { "number": "0098", "from": "03/20/2015" }];
    WinJS.Namespace.define("Rooms.ListView", {
        data: new WinJS.Binding.List(items)
    })

    var page = WinJS.UI.Pages.define("html/list.html", {
        ready: function (element, options) {
           

        }
    })

   
})();