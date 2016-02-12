// NOTES:
// - Logic was a little different this time through. No input validation.
// More checking the returned data.

var pokitDokApp = pokitDokApp || (function() {

  // Helper function to format the phone #
  function formatNumber(phone) {
    return "(" + phone.substr(0,3) + ")-" + phone.substr(3,3) + "-" + phone.substr(6,4);
  }

  function generate() {
    // Disabling button allowing each server call + DOM construction to occur. In turn
    // preventing the user from overclicking
    $("#submitButton").attr("disabled", "disabled");

    $("#endDiv").css("display","none");
    $("#startDiv").css("display","block");
    $("#startDiv").empty();
    $("#endDiv").empty();
    $("#startDiv").append("<img src='images/loading.gif' alt='Loading...''>");
    function ajaxCall1() {
      return $.ajax({
        url: "/cash",
        type: "GET"
      });
    }
    function ajaxCall2() {
      return $.ajax({
        url: "/providers",
        type: "GET"
      });
    }
    $.when(ajaxCall1(), ajaxCall2()).done(function(a1Data, a2Data) {
      //Setting up cash div
      $("<div class='row'></div>")
            .appendTo("#endDiv")
            .append("<div class='small-12 columns' style='font-weight: bold; font-size: 1.2em;'>Average Price for Psychiatric Diagnosis:<div>");
      // Checking to make sure something was returned from cashPrices API
      if (a1Data.length > 0) {
        $("<div class='row'></div>")
            .appendTo("#endDiv")
            .append("<div class='small-12 columns' style='padding-left:2em;'>$" + a1Data[0][0].average_price.toFixed(2) +"<div>");
      } else {
        $("<div class='row'></div>")
            .appendTo("#endDiv")
            .append("<div class='small-12 columns' style='padding-left:2em;'> There seems to be a problem. Please try again later. <div>");
      }
      //Setting up providers div
      $("<div class='row'></div>")
            .appendTo("#endDiv")
            .append("<div class='small-12 columns' style='font-weight: bold; font-size: 1.2em;'>Psychologists in the Charleston area:<div>");
      // Checking to make sure something was returned from the providers API
      if (a2Data.length > 0) {
        for (var index in a2Data[0]) {
            if (!a2Data[0].hasOwnProperty(index)) continue;
            // Distance and phone are in every object so I'm not doing a check to see if the data exists.
            $("<div class='row'></div>")
              .appendTo("#endDiv")
              .append("<div class='small-6 columns' style='padding-left:2em;'>Distance: "+parseFloat(a2Data[0][index].distance).toFixed(2)+" miles<div>")
              .append("<div class='small-6 columns'>Phone #: "+formatNumber(a2Data[0][index].provider.phone)+"<div>");
            //Logic to decide whether to display name or organization
            if (a2Data[0][index].provider.hasOwnProperty("first_name") && a2Data[0][index].provider.hasOwnProperty("last_name")) {
              $("<div class='row'></div>")
                .appendTo("#endDiv")
                .append("<div class='small-12 columns' style='padding-left:2em; padding-bottom: 0.5em;'>Provider Name: " + a2Data[0][index].provider.first_name + " " + a2Data[0][index].provider.last_name  + "<div>");
            } else if (a2Data[0][index].provider.hasOwnProperty("organization_name")) {
              $("<div class='row'></div>")
                .appendTo("#endDiv")
                .append("<div class='small-12 columns' style='padding-left:2em; padding-bottom: 0.5em;'>Organization Name: " + a2Data[0][index].provider.organization_name  + "<div>");
            } else {
              $("<div class='row'></div>")
                .appendTo("#endDiv")
                .append("<div class='small-12 columns' style='padding-left:2em; padding-bottom: 0.5em;'>No name or organization could be found.<div>");
            }
          }
      } else {
        $("<div class='row'></div>")
            .appendTo("#endDiv")
            .append("<div class='small-12 columns' style='padding-left:2em;'> There seems to be a problem. Please try again later. <div>");
      }
      $("#startDiv").css("display","none");
      $("#endDiv").css("display","block");
      $("#submitButton").removeAttr('disabled');
    });
  }

  // Function to set the height of the 'button' div to it's parent's height.
  // The reason I'm doing this is to vertially align the button. Throttle probably
  // not necessary but keeping to mindset of production quality.
  $(window).resize( _.throttle( function() {
    $("#button").css("height", $("#instructions").height());
  }, 1000 ) );
  $(window).trigger('resize');

  var api = {
    init: function() {
      $(document).foundation();
    },
    generate: generate
  };

  return api;
})();