import HomePage from "../pages/home.f7.html";
import SongsPage from "../pages/songs.f7.html";
import FavoritePage from "../pages/favorite.f7.html";
import ActivityPage from "../pages/activity.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import SingleSongPage from "../pages/single-activity.f7.html";
import SingleActivityPage from "../pages/single-activity.f7.html";
import AddActivityPage from "../pages/add-activity.f7.html";

import FormPage from "../pages/form.f7.html";
import CatalogPage from "../pages/catalog.f7.html";
import ProductPage from "../pages/product.f7.html";
import DynamicRoutePage from "../pages/dynamic-route.f7.html";
import RequestAndLoad from "../pages/request-and-load.f7.html";
import NotFoundPage from "../pages/404.f7.html";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/songs/",
    component: SongsPage,
  },
  {
    path: "/favorite/",
    component: FavoritePage,
  },
  {
    path: "/activity/",
    component: ActivityPage,
  },
  {
    path: "/settings/",
    component: SettingsPage,
  },
  {
    path: "/about/",
    component: AboutPage,
  },
  {
    path: "/single-song/",
    component: SingleSongPage,
  },
  {
    path: "/single-activity/",
    component: SingleActivityPage,
  },
  {
    path: "/add-activity/",
    component: AddActivityPage,
  },
  {
    path: "/form/",
    component: FormPage,
  },
  {
    path: "/catalog/",
    component: CatalogPage,
  },
  {
    path: "/product/:id/",
    component: ProductPage,
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage,
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io",
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io",
            },
          ],
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            },
          }
        );
      }, 1000);
    },
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
