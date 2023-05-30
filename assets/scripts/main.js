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

  ROUTER.addBeforeHook('/', (done) => main.destroy(done))
};

document.addEventListener('DOMContentLoaded', app);
