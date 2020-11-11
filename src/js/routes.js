import SongsPage from "../pages/songs.f7.html";
import FavoritePage from "../pages/favorite.f7.html";
import SettingsPage from "../pages/settings.f7.html";
import AboutPage from "../pages/about.f7.html";
import SingleSongPage from "../pages/single-song.f7.html";
import NotFoundPage from "../pages/404.f7.html";

var routes = [
  {
    path: "/",
    component: SongsPage,
  },
  {
    path: "/favorite/",
    component: FavoritePage,
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
  // {
  //   path: "/product/:id/",
  //   component: ProductPage,
  // },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;
