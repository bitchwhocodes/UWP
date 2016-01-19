(function () {
    "use strict";
    var datePicker;
    var endDate, startDate;
    var systemNavigationManager = Windows.UI.Core.SystemNavigationManager.getForCurrentView();
    var loc = null;
    var app = WinJS.Application;

    var page = WinJS.UI.Pages.define("html/add.html", {
        ready: function (element, options) {
            console.log("Add page ready");
            savebutton.addEventListener("click", saveRoomNumber, false);
            returnbutton.addEventListener("click", returnHome, false);
            datepicker.addEventListener("change", handleChange, false);
            roominput.addEventListener("input", handleInputChange, false);
            console.log("stacey" + app.sessionState.roomInput);
            if (app.sessionState && app.sessionState.roomInput != undefined) {
                roominput.value = app.sessionState.roomInput;
            } else {
                roominput.value = '';
            }
            
         
            datePicker = datepicker.winControl;
            startDate = datePicker.current.toLocaleDateString();

            systemNavigationManager.addEventListener("backrequested", backRequested);
            systemNavigationManager.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.visible;
            console.log(datePicker);

            getLoc();
            
        },
        unload: function () {
            systemNavigationManager.removeEventListener("backrequested", backRequested);

            savebutton.removeEventListener("click", transitionBetweenPages);
            returnbutton.removeEventListener("click", returnHome);
            datepicker.removeEventListener("change", handleChange);
            systemNavigationManager.appViewBackButtonVisibility = Windows.UI.Core.AppViewBackButtonVisibility.collapsed;
        }
    })

    function handleInputChange() {
        var input = WinJS.Utilities.query("input");
        var value = input[0].value;
        app.sessionState.roomInput = value;
        console.log('stacey'+app.sessionState.roomInput)
       
        
    }

    function saveRoomNumber(obj){
        var input = WinJS.Utilities.query("input");
        var value = input[0].value;
        if (isNaN(value)) {
            // should handle this
        } else {
            writeRoomNumber(value);
        }

    }
    function writeRoomNumber(value)
    {
        var room = {
            "number": value,
            "from":startDate,
            "to":endDate
        }

        Rooms.ListView.data.push(room);
        console.log(RoomKey.rooms);
        var promise = WinJS.Application.roaming.writeText("current", JSON.stringify(RoomKey.rooms));
        promise.done(function () {
            goHome();
        })
    }
    function backRequested() {
        goHome();
    }

    function handleChange(obj)
    {
        console.log("Date Picker change");
        endDate = datePicker.current.toLocaleDateString();
        console.log("ened date" + endDate);
      
    }

    function getLoc() {
        if (loc == null) { loc = new Windows.Devices.Geolocation.Geolocator(); }
        if (loc != null) { loc.getGeopositionAsync().then(getPositionHandler, errorHandler); }
    }

    function getPositionHandler(pos)
    {
        var point = pos.coordinate.point.position;
        console.log("Lat: "+point.latitude);
        console.log("Long :" + point.longitude);
        var url = "http://dev.virtualearth.net/REST/v1/Locations/" + point.latitude + "," + point.longitude + "?o=json&key=0nNn7QOt0t70b88pzUG5~NOX_BfvejoJJZ-h4ecfxuA~AuGtrUcPMAzWa0Yl09ghfxZJW_08iINI2OmafNDTDIvJaMAAQZlQmK2KLB2lrEIP";
        console.log(url);
        WinJS.xhr({
            url: url,
            responseType:"json"
        }).done(function (result) {
            if (result.response.resourceSets)
            {
                RoomKey.location = result.response.resourceSets[0].resources[0].name
            }
        })
    }

    function errorHandler(e)
    {
        console.log(getStatusString(loc.locationStatus));
    }

    function getStatusString(locStatus) {
        switch (locStatus) {
            case Windows.Devices.Geolocation.PositionStatus.ready:
                // Location data is available
                return "Location is available.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.initializing:
                // This status indicates that a GPS is still acquiring a fix
                return "A GPS device is still initializing.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.noData:
                // No location data is currently available 
                return "Data from location services is currently unavailable.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.disabled:
                // The app doesn't have permission to access location,
                // either because location has been turned off.
                return "Your location is currently turned off. " +
                    "Change your settings through the Settings charm " +
                    " to turn it back on.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.notInitialized:
                // This status indicates that the app has not yet requested
                // location data by calling GetGeolocationAsync() or 
                // registering an event handler for the positionChanged event. 
                return "Location status is not initialized because " +
                    "the app has not requested location data.";
                break;
            case Windows.Devices.Geolocation.PositionStatus.notAvailable:
                // Location is not available on this version of Windows
                return "You do not have the required location services " +
                    "present on your system.";
                break;
            default:
                break;
        }
    }

    function transitionBetweenPages(obj) {

       
    }
    function returnHome(obj)
    {
        goHome();
    }
    function goHome() {
        WinJS.UI.Animation.exitPage(addpage, null).done(function () {
            WinJS.Navigation.navigate("html/home.html","add");
        })
    }
})();