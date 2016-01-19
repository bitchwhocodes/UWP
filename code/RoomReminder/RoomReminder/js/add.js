(function () {
    "use strict";
    var datePicker;
    var endDate, startDate;
    
    var page = WinJS.UI.Pages.define("html/add.html", {
        ready: function (element, options) {
            console.log("Add page ready");
            savebutton.addEventListener("click", transitionBetweenPages, false);
            returnbutton.addEventListener("click", returnHome, false);
            datepicker.addEventListener("change", handleChange, false);
         
            datePicker = datepicker.winControl;
            startDate = datePicker.current.toLocaleDateString();
            console.log(datePicker);
            
        }
    })

    function handleChange(obj)
    {
        console.log("Date Picker change");
        endDate = datePicker.current.toLocaleDateString();
        console.log("ened date" + endDate);
    }

    function transitionBetweenPages(obj) {

       
    }
    function returnHome(obj)
    {
        goHome();
    }
    function goHome() {
        WinJS.UI.Animation.exitPage(addpage, null).done(function () {
            WinJS.Navigation.navigate("html/home.html");
        })
    }
})();