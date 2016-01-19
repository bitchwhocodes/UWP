

(function () {
    "use strict";
   
    WinJS.Namespace.define("Rooms.ListView", {
        data: new WinJS.Binding.List(RoomKey.rooms)
    })

    var page = WinJS.UI.Pages.define("html/list.html", {
        ready: function (element, options) {
        
        }
    })

})();