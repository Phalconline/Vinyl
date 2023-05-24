import Navigo from 'navigo';
import common from "./common";
import main from "./routes/main";
import favourites from "./routes/favourites";
import API from "./utils/api"

const router = new Navigo('/', { strategy: 'ALL' });

const app = async () => {
  API.init();
  common.init();

  router.on({
    '/':  () => main.init(),
    '/favourites':  () => favourites.init(),
  }).resolve();
};

document.addEventListener('DOMContentLoaded', app);
