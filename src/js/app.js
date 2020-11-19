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

let songs = {
  1: {
    title: "When we all get to heven",
    author: "John Doe",
    stanzas: {
      1: "Some texts 1",
      2: "SOme texts 2",
      3: "Some texts 3",
    },
    chorus: "Some texts Chorus",
    mp3: "../static/musicFiles/WhenWeAllGettoHeaven.mp3",
    favorite: true,
  },
  2: {
    title: "To God be the Glory",
    author: "Melvin Palley",
    stanzas: {
      1: "Some texts 1",
      2: "SOme texts 2",
      3: "Some texts 3",
      4: "Some texts 4",
    },
    chorus: "Some texts Chorus",
    mp3: "../static/musicFiles/ToGodBetheGlory.mp3",
    favorite: true,
  },
  3: {
    title: "Faith of our father",
    author: "Benson Kamada",
    stanzas: {
      1: "Some texts 1",
      2: "SOme texts 2",
    },
    chorus: "Some texts Chorus",
    mp3: "../static/musicFiles/FaithofOurFathers.mp3",
    favorite: false,
  },
};

let order_list_ele;
app.on("pageInit", function (page) {
  if (page.name === "songs") {
    order_list_ele = document.querySelector("#songs-ol");
    order_list_ele.innerHTML = "";
    displaySongs(page.name);
    console.log("songs");
  } else if (page.name === "favorite") {
    order_list_ele = document.querySelector("#favorite-ol");
    order_list_ele.innerHTML = "";
    displaySongs(page.name);
    console.log("Fvorite");
  }

  /**
   * Toggle between like and unlike
   */
  $$(".favorite").on("click", function (e) {
    let favorite_icon_id = e.target.id;
    let last_word = favorite_icon_id.split("-").pop();
    favorite_icon_id = favorite_icon_id.split("-").slice(0, -1).join("-");

    if (last_word === "like") {
      document.getElementById(`${favorite_icon_id}-like`).style =
        "display: none";
      document.getElementById(`${favorite_icon_id}-unlike`).style =
        "display: block";
    } else {
      document.getElementById(`${favorite_icon_id}-like`).style =
        "display: block";
      document.getElementById(`${favorite_icon_id}-unlike`).style =
        "display: none";
    }
  });
});

/**
 * Display songs when the songs page loads
 */
const displaySongs = (page) => {
  let keys = Object.keys(songs);
  /**
   * Loop through object and display all the songs
   */
  keys.forEach((ele) => {
    let title = songs[ele].title;
    let author = songs[ele].author;
    let audio_id = title.split(" ").join("-");
    let stanzas = Object.keys(songs[ele].stanzas).length;
    let music_file = songs[ele].mp3;
    let favorite = songs[ele].favorite; // true or false

    if (page === "songs") {
      let list_item = `
      <li id=song-${ele}>
        <div class="item-content">
          <a href="/single-song/">
            <div class="item-inner">
              <div class="item-title">
                <div class="item-header">By: ${author}</div>
                ${title}
                <div class="item-footer">${stanzas} Stanzas</div>
              </div>
            </div>
          </a>
          <div class="item-media">
            <i class="f7-icons favorite" id="${audio_id}-like">heart</i>
            <i class="f7-icons favorite" id="${audio_id}-unlike">heart_fill</i>
            <i class="f7-icons play" id="${audio_id}-play">play_circle</i>
            <i class="f7-icons stop" id="${audio_id}-stop" style="display:none">stop_circle</i>
            <audio
              src="${music_file}" id="${audio_id}"></audio>
          </div>
        </div>
      </li>
    `;
      order_list_ele.insertAdjacentHTML("beforeend", list_item);
      if (favorite) {
        console.log("yes favorite", audio_id);
        document.getElementById(`${audio_id}-like`).style = "display: none";
        document.getElementById(`${audio_id}-unlike`).style = "display: block";
      } else {
        console.log("no favorite", audio_id);
        document.getElementById(`${audio_id}-like`).style = "display: block";
        document.getElementById(`${audio_id}-unlike`).style = "display: none";
      }
    } else if (page === "favorite") {
      if (favorite) {
        let list_item = `
          <li id=favorite-${ele}>
            <div class="item-content">
              <a href="/single-song/">
                <div class="item-inner">
                  <div class="item-title">
                    <div class="item-header">By: ${author}</div>
                    ${title}
                    <div class="item-footer">${stanzas} Stanzas</div>
                  </div>
                </div>
              </a>
              <div class="item-media">
                <i class="f7-icons remove-from-favorite" id="${audio_id}-remove">xmark_circle</i>
                <i class="f7-icons favorite-play" id="${audio_id}-favorite_play">play_circle</i>
                <i class="f7-icons favorite-stop" id="${audio_id}-favorite_stop" style="display:none">stop_circle</i>
                <audio
                  src="${music_file}" id="${audio_id}"></audio>
              </div>
            </div>
          </li>
        `;
        order_list_ele.insertAdjacentHTML("beforeend", list_item);
      }

      // document.querySelectorAll(".remove-from-favorite").forEach((ele) => {
      //   ele.style = "display: block";
      // });

      // document.querySelectorAll(".favorite").forEach((ele) => {
      //   ele.style = "display: none";
      // });
    } else {
      console.log("other pages", page);
    }
  });
};
