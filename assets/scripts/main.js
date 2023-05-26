import Navigo from 'navigo';
import common from "./common";
import main from "./routes/main";
import favourites from "./routes/favourites";
import API from "./utils/api";

const ROUTER = new Navigo('/', { strategy: 'ALL' });

const app = async () => {
  API.init();
  common.init();

  ROUTER.on({
    '/':  (match) => main.init(match),
    '/favourites':  (match) => favourites.init(match),
  }).resolve();

  window.addEventListener("historyStateUpdate", (event) => {
    ROUTER.navigate(event.detail.url);
  }, {passive: true});
};

document.addEventListener('DOMContentLoaded', app);
