import $$ from "dom7";
import Framework7 from "framework7/framework7.esm.bundle.js";

// Import F7 Styles
import "framework7/css/framework7.bundle.css";

// Import Icons and App Custom Styles
import "../css/icons.css";
import "../css/app.css";
// Import Cordova APIs
import cordovaApp from "./cordova-app.js";
// Import Routes
import routes from "./routes.js";

// Import main app component
import App from "../app.f7.html";

var app = new Framework7({
  root: "#app", // App root element
  component: App, // App main component
  id: "io.framework7.cbchymnal", // App bundle ID
  name: "CBC Hymnal", // App name
  theme: "auto", // Automatic theme detection

  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus:
      Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered:
      Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
    },
  },
});

app.on("pageInit", function (page) {
  // do something on page init
  console.log("Ollkjk", page);
  // app.dialog.alert("hipopo");

  $$(".play").on("click", function (e) {
    console.log("clicked");
  });

  function play() {
    alert("Ok");
  }
});

$$(".play").on("click", function (e) {
  console.log("clicked");
});

// app.dialog.alert("hi");
